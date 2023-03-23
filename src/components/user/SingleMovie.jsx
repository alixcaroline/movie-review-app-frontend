import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSingleMovie } from '../../api/movie';
import { useAuth, useNotification } from '../../hooks';
import Container from '../Container';
import CustomBtnLink from '../CustomBtnLink';
import AddRatingModal from '../modals/AddRatingModal';
import ProfileModal from '../modals/ProfileModal';
import RatingStar from '../RatingStar';
import RelatedMovies from './RelatedMovies';

const ListWithLabel = ({ label, children }) => {
	return (
		<div className='flex space-x-2'>
			<p className='text-light-subtle dark:text-dark-subtle font-semibold'>
				{label}
			</p>
			{children}
		</div>
	);
};

const CastProfile = ({ profile, roleAs, handleProfileClick }) => {
	const { name, avatar } = profile;
	return (
		<div className='flex flex-col items-center text-center basis-28 mb-4'>
			<img
				className='w-24 h-24 aspect-square object-cover rounded-full'
				src={avatar}
				alt={name}
			/>

			<CustomBtnLink label={name} onClick={() => handleProfileClick(profile)} />

			<span className=' text-sm text-light-subtle dark:text-dark-subtle'>
				as
			</span>
			<p className='text-light-subtle dark:text-dark-subtle'>{roleAs}</p>
		</div>
	);
};

const convertReviewCount = (count = 0) => {
	if (count <= 999) return count;

	return parseFloat(count / 1000).toFixed(2) + 'k';
};

const convertDate = (date = '') => {
	return date.split('T')[0];
};

const SingleMovie = () => {
	const [ready, setReady] = useState(false);
	const [movie, setMovie] = useState({});
	const [showRatingModal, setShowRatingModal] = useState(false);
	const [showProfileModal, setShowProfileModal] = useState(false);
	const [selectedProfile, setSelectedProfile] = useState({});

	const { movieId } = useParams();

	const { updateNotification } = useNotification();
	const { authInfo } = useAuth();
	const { isLoggedIn } = authInfo;
	const navigate = useNavigate();

	const fetchMovie = async () => {
		const { error, movie } = await getSingleMovie(movieId);

		if (error) return updateNotification('error', error);
		setReady(true);
		setMovie(movie);
	};

	const handleOnRateMovie = () => {
		if (!isLoggedIn) return navigate('/auth/signin');
		setShowRatingModal(true);
	};

	const hideRatingModal = () => {
		setShowRatingModal(false);
	};

	const handleOnRatingSuccess = (reviews) => {
		setMovie({ ...movie, reviews: { ...reviews } });
	};

	const handleProfileClick = (profile) => {
		setSelectedProfile(profile);
		setShowProfileModal(true);
	};

	const hideProfileModal = () => {
		setShowProfileModal(false);
	};

	useEffect(() => {
		if (movieId) fetchMovie();
	}, [movieId]);

	if (!ready)
		return (
			<div className='w-screen h-screen flex justify-center items-center bg-white dark:bg-primary'>
				<p className='text-light-subtle dark:text-dark-subtle animate-pulse'>
					Please wait
				</p>
			</div>
		);

	const {
		trailer,
		poster,
		title,
		storyLine,
		language,
		releaseDate,
		type,
		genres = [],
		writers = [],
		cast = [],
		director = {},
		reviews = {},
	} = movie;

	return (
		<div className=' bg-white dark:bg-primary min-h-screen pb-10'>
			<Container className='xl:px-0 px-2'>
				<video poster={poster} controls src={trailer}></video>
				<div className='flex justify-between'>
					<h1 className='xl:text-4xl lg:text-3xl text-2xl text-highlight dark:text-highlight-dark font-semibold py-3'>
						{title}
					</h1>
					<div className='flex flex-col items-end'>
						<RatingStar rating={reviews.ratingAvg} />
						<CustomBtnLink
							onClick={() => navigate('/movie/reviews/' + movieId)}
							label={convertReviewCount(reviews.reviewCount) + ' Reviews'}
						/>

						<CustomBtnLink
							onClick={handleOnRateMovie}
							label='Rate this movie'
						/>
					</div>
				</div>
				<div className='space-y-3'>
					<p className='text-light-subtle dark:text-dark-subtle'>{storyLine}</p>

					<ListWithLabel label='Director:'>
						<CustomBtnLink
							label={director.name}
							onClick={() => handleProfileClick(director)}
						/>
					</ListWithLabel>

					<ListWithLabel label='Writers:'>
						{writers.map((w) => (
							<CustomBtnLink
								key={w.id}
								label={w.name}
								onClick={() => handleProfileClick(w)}
							/>
						))}
					</ListWithLabel>

					<ListWithLabel label='Cast:'>
						{cast.map(({ id, profile, leadActor }) => {
							return leadActor ? (
								<CustomBtnLink
									label={profile.name}
									key={id}
									onClick={() => handleProfileClick(profile)}
								/>
							) : null;
						})}
					</ListWithLabel>

					<ListWithLabel label='Language:'>
						<CustomBtnLink label={language} clickable={false} />
					</ListWithLabel>

					<ListWithLabel label='Release date:'>
						<CustomBtnLink label={convertDate(releaseDate)} clickable={false} />
					</ListWithLabel>

					<ListWithLabel label='Genres:'>
						{genres.map((g) => {
							return <CustomBtnLink key={g} label={g} />;
						})}
					</ListWithLabel>

					<ListWithLabel label='Type:'>
						<CustomBtnLink label={type} />
					</ListWithLabel>
				</div>

				<div className='mt-5'>
					<h1 className='text-2xl mb-2 text-highlight dark:text-highlight-dark'>
						Cast:
					</h1>
					<div className='flex flex-wrap space-x-4'>
						{cast.map((c) => {
							return (
								<CastProfile
									key={c.profile.id}
									profile={c.profile}
									roleAs={c.roleAs}
									handleProfileClick={handleProfileClick}
								/>
							);
						})}
					</div>
				</div>
				<div className='mt-3'>
					<RelatedMovies movieId={movieId} />
				</div>
			</Container>
			<ProfileModal
				visible={showProfileModal}
				onClose={hideProfileModal}
				profileId={selectedProfile.id}
			/>
			<AddRatingModal
				visible={showRatingModal}
				onClose={hideRatingModal}
				onSuccess={handleOnRatingSuccess}
			/>
		</div>
	);
};

export default SingleMovie;
