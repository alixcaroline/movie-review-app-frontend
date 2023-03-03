import React, { useEffect, useState } from 'react';
import { deleteMovie, getMovieForUpdate, getMovies } from '../../api/movie';
import MovieListItem from '../MovieListItem';
import { useMovies, useNotification } from '../../hooks/index';
import PrevAndNextBtn from '../PrevAndNextBtn';
import UpdateMovie from '../modals/UpdateMovie';
import ConfirmModal from '../modals/ConfirmModal';

let currentPageNo = 0;
let limit = 10;

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState(null);

	const {
		fetchMovies,
		fetchPrevPage,
		fetchNextPage,
		movies: newMovies,
	} = useMovies();

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

	const handleUIUpdate = () => fetchMovies();

	useEffect(() => {
		fetchMovies(currentPageNo);
	}, []);

	return (
		<>
			<div className='space-y-3 p-5'>
				{newMovies.map((movie) => {
					return (
						<MovieListItem
							movie={movie}
							key={movie.id}
							afterDelete={handleUIUpdate}
							afterUpdate={handleUIUpdate}
						/>
					);
				})}
				<PrevAndNextBtn
					className='mt-5'
					onPrevClick={fetchPrevPage}
					onNextClick={fetchNextPage}
				/>
			</div>

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
