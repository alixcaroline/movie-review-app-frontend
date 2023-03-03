import React, { useEffect, useState } from 'react';
import { deleteMovie, getMovieForUpdate, getMovies } from '../../api/movie';
import MovieListItem from '../MovieListItem';
import { useNotification } from '../../hooks/index';
import PrevAndNextBtn from '../PrevAndNextBtn';
import UpdateMovie from '../modals/UpdateMovie';
import ConfirmModal from '../modals/ConfirmModal';

let currentPageNo = 0;
let limit = 10;

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [reachedToEnd, setReachedToEnd] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [busy, setBusy] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState(null);

	const { updateNotification } = useNotification();

	const fetchMovies = async (pageNo, limit) => {
		const { error, movies } = await getMovies(pageNo, limit);
		if (error) return updateNotification('error', error);
		if (!movies.length) {
			currentPageNo = pageNo - 1;
			return setReachedToEnd(true);
		}
		setMovies([...movies]);
	};

	const handleOnNextClick = () => {
		if (reachedToEnd) return;
		currentPageNo += 1;
		fetchMovies(currentPageNo);
	};

	const handleOnPrevClick = () => {
		if (currentPageNo <= 0) return;
		if (reachedToEnd) setReachedToEnd(false);

		currentPageNo -= 1;
		fetchMovies(currentPageNo);
	};

	const handleOnEditClick = async ({ id }) => {
		const { movie, error } = await getMovieForUpdate(id);
		if (error) return updateNotification('error', error);
		setSelectedMovie(movie);
		setShowUpdateModal(true);
	};

	const handleOnUpdate = (movie) => {
		const updatedMovies = movies.map((m) => {
			if (m.id === movie.id) return movie;
			return m;
		});
		setMovies([...updatedMovies]);
	};
	const hideUpdateModal = () => {
		setShowUpdateModal(false);
	};

	const handleOnDeleteClick = (movie) => {
		setSelectedMovie(movie);
		setShowConfirmModal(true);
	};

	const hideConfirmModal = () => {
		setShowConfirmModal(false);
	};

	const handleOnDeleteConfirm = async () => {
		setBusy(true);
		const { error, message } = await deleteMovie(selectedMovie.id);
		setBusy(false);
		if (error) return updateNotification('error', error);
		updateNotification('success', message);
		hideConfirmModal();
		fetchMovies(currentPageNo);
	};

	useEffect(() => {
		fetchMovies(currentPageNo);
	}, []);

	return (
		<>
			<div className='space-y-3 p-5'>
				{movies.map((movie) => {
					return (
						<MovieListItem
							movie={movie}
							key={movie.id}
							onEditClick={() => handleOnEditClick(movie)}
							onDeleteClick={() => handleOnDeleteClick(movie)}
						/>
					);
				})}
				<PrevAndNextBtn
					className='mt-5'
					onPrevClick={handleOnPrevClick}
					onNextClick={handleOnNextClick}
				/>
			</div>
			<ConfirmModal
				visible={showConfirmModal}
				onCancel={hideConfirmModal}
				onConfirm={handleOnDeleteConfirm}
				title='Are you sure?'
				subtitle='This action will remove this movie permanently'
				busy={busy}
			/>
			<UpdateMovie
				visible={showUpdateModal}
				initialState={selectedMovie}
				onSuccess={handleOnUpdate}
				onClose={hideUpdateModal}
			/>
		</>
	);
};

export default Movies;
