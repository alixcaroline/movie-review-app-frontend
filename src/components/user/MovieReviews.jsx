import React, { useEffect, useState } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { deleteReview, getReviewsByMovie } from '../../api/review';
import { useAuth, useNotification } from '../../hooks';
import Container from '../Container';
import CustomBtnLink from '../CustomBtnLink';
import ConfirmModal from '../modals/ConfirmModal';
import EditRatingModal from '../modals/EditRatingModal';
import NotFoundText from '../NotFoundText';
import RatingStar from '../RatingStar';

const getNameInitial = (name = '') => {
	return name[0].toLocaleUpperCase();
};

const ReviewCard = ({ review }) => {
	if (!review) return null;
	const { owner, content, rating } = review;
	return (
		<div className='flex space-x-3'>
			<div className='flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none'>
				{getNameInitial(owner.name)}
			</div>
			<div>
				<h1 className='text-white dark:text-secondary font-semibold text-lg'>
					{owner.name}
				</h1>
				<RatingStar rating={rating} />
				<p className='text-light-subtle dark:text-dark-subtle'>{content}</p>
			</div>
		</div>
	);
};

const MovieReviews = () => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [busy, setBusy] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [selectedReview, setSelectedReview] = useState({});
	const [movieTitle, setMovieTitle] = useState('');
	const [profileOwnersReview, setProfileOwnersReview] = useState(null);

	const { movieId } = useParams();
	const { updateNotification } = useNotification();
	const { authInfo } = useAuth();
	const profileId = authInfo.profile?.id;

	const fetchReviews = async () => {
		const { error, movie } = await getReviewsByMovie(movieId);

		if (error) return updateNotification('error', error);

		setReviews([...movie.reviews]);
		setMovieTitle(movie.title);
	};

	const findProfileOwnersReview = () => {
		if (profileOwnersReview) return setProfileOwnersReview(null);
		const matched = reviews.find((review) => review.owner.id === profileId);
		if (!matched)
			return updateNotification(
				'error',
				"You don't have a review for this movie",
			);

		setProfileOwnersReview(matched);
	};

	const displayConfirmModal = () => {
		setShowConfirmModal(true);
	};

	const hideConfirmModal = () => {
		setShowConfirmModal(false);
	};

	const handleDeleteConfirm = async () => {
		setBusy(true);
		const { error, message } = await deleteReview(profileOwnersReview.id);
		setBusy(false);

		if (error) return updateNotification('error', error);
		updateNotification('success', message);

		const updatedReviews = reviews.filter((r) => r !== profileOwnersReview.id);
		setReviews([...updatedReviews]);
		setProfileOwnersReview(null);
		hideConfirmModal();
	};

	const handleOnEditClick = () => {
		const { id, content, rating } = profileOwnersReview;
		setSelectedReview({
			id,
			content,
			rating,
		});
		setShowEditModal(true);
	};

	const handleOnReviewUpdate = (review) => {
		const updatedReview = {
			...profileOwnersReview,
			rating: review.rating,
			content: review.content,
		};

		setProfileOwnersReview({ ...updatedReview });

		const newReviews = reviews.map((review) => {
			if (review.id === updatedReview.id) return updatedReview;
			return review;
		});

		setReviews([...newReviews]);
	};

	const hideEditModal = () => {
		setShowEditModal(false);
		setSelectedReview(null);
	};

	useEffect(() => {
		if (movieId) fetchReviews();
	}, [movieId]);

	return (
		<div className='dark:bg-primary bg-white min-h-screen pb-10'>
			<Container className='xl:px-0 px-2 py-8'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl font-semibold dark:text-white text-secondary'>
						<span className='text-light-subtle dark:text-dark-subtle font-normal'>
							Reviews for:
						</span>{' '}
						{movieTitle}
					</h1>
					{profileId ? (
						<CustomBtnLink
							label={profileOwnersReview ? 'View all' : 'Find my review'}
							onClick={findProfileOwnersReview}
						/>
					) : null}
				</div>

				<NotFoundText text='No reviews!' visible={!reviews.length} />

				{profileOwnersReview ? (
					<div>
						<ReviewCard review={profileOwnersReview} />
						<div className='flex space-x-3 dark:text-white text-primary text-xl'>
							<button onClick={displayConfirmModal} type='button'>
								<BsTrash />
							</button>
							<button onClick={handleOnEditClick} type='button'>
								<BsPencil />
							</button>
						</div>
					</div>
				) : (
					<div className='space-y-3 mt-3'>
						{reviews.map((review) => (
							<ReviewCard review={review} key={review.id} />
						))}
					</div>
				)}
			</Container>

			<ConfirmModal
				busy={busy}
				visible={showConfirmModal}
				onCancel={hideConfirmModal}
				onConfirm={handleDeleteConfirm}
				title='Are you sure?'
				subtitle='this action will remove this review permanently'
			/>
			<EditRatingModal
				visible={showEditModal}
				initialState={selectedReview}
				onSuccess={handleOnReviewUpdate}
				onClose={hideEditModal}
			/>
		</div>
	);
};

export default MovieReviews;
