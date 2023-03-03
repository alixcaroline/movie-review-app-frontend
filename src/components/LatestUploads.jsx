import React, { useEffect, useState } from 'react';
import { getMovies } from '../api/movie';
import { useNotification } from '../hooks';
import ConfirmModal from './modals/ConfirmModal';
import MovieListItem from './MovieListItem';
import UpdateMovie from './modals/UpdateMovie';
import { getMovieForUpdate, deleteMovie } from '../api/movie.js';

const pageNo = 0;
const limit = 5;

const LatestUploads = () => {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [busy, setBusy] = useState(false);

	const { updateNotification } = useNotification();

	const fetchLatestUploads = async () => {
		const { error, movies } = await getMovies(pageNo, limit);
		if (error) return updateNotification('error', error);
		setMovies([...movies]);
	};

	const handleOnDeleteClick = (movie) => {
		setSelectedMovie(movie);
		setShowConfirmModal(true);
	};

	const handleOnEditClick = async ({ id }) => {
		const { movie, error } = await getMovieForUpdate(id);
		if (error) return updateNotification('error', error);
		setSelectedMovie(movie);
		setShowUpdateForm(true);
	};

	const handleOnUpdate = (movie) => {
		const updatedMovies = movies.map((m) => {
			if (m.id === movie.id) return movie;
			return m;
		});
		setMovies([...updatedMovies]);
	};

	const hideUpdateForm = () => {
		setShowUpdateForm(false);
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
		fetchLatestUploads();
	};

	useEffect(() => {
		fetchLatestUploads();
	}, []);

	return (
		<div className='bg-white shadow dark:bg-secondary p-5 rounded col-span-2'>
			<h1 className='font-semibold text-2xl text-primary dark:text-white'>
				Recent uploads
			</h1>
			<div className='space-y-3'>
				{movies.map((m) => (
					<MovieListItem
						movie={m}
						key={m.id}
						onDeleteClick={() => handleOnDeleteClick(m)}
						onEditClick={() => handleOnEditClick(m)}
					/>
				))}

				<ConfirmModal
					visible={showConfirmModal}
					onCancel={hideConfirmModal}
					onConfirm={handleOnDeleteConfirm}
					title='Are you sure?'
					subtitle='This action will remove this movie permanently'
					busy={busy}
				/>
				<UpdateMovie
					visible={showUpdateForm}
					initialState={selectedMovie}
					onSuccess={handleOnUpdate}
					onClose={hideUpdateForm}
				/>
			</div>
		</div>
	);
};

export default LatestUploads;
