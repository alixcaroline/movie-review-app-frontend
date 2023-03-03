import React, { useEffect, useState } from 'react';
import { useMovies, useNotification } from '../hooks';
import ConfirmModal from './modals/ConfirmModal';
import MovieListItem from './MovieListItem';
import UpdateMovie from './modals/UpdateMovie';
import { getMovieForUpdate, deleteMovie } from '../api/movie.js';

const LatestUploads = () => {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [showUpdateForm, setShowUpdateForm] = useState(false);

	const { updateNotification } = useNotification();
	const { latestUploads, fetchLatestUploads } = useMovies();

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

	const handleUIUpdate = () => fetchLatestUploads();

	useEffect(() => {
		fetchLatestUploads();
	}, []);

	return (
		<div className='bg-white shadow dark:bg-secondary p-5 rounded col-span-2'>
			<h1 className='font-semibold text-2xl text-primary dark:text-white'>
				Recent uploads
			</h1>
			<div className='space-y-3'>
				{latestUploads.map((m) => (
					<MovieListItem
						movie={m}
						key={m.id}
						afterDelete={handleUIUpdate}
						afterUpdate={handleUIUpdate}
					/>
				))}

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
