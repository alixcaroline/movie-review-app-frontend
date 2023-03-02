import React, { useEffect, useState } from 'react';
import { getMovies } from '../../api/movie';
import MovieListItem from '../MovieListItem';
import { useNotification } from '../../hooks/index';
import PrevAndNextBtn from '../PrevAndNextBtn';

let currentPageNo = 0;
let limit = 10;

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [reachedToEnd, setReachedToEnd] = useState(false);

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

	useEffect(() => {
		fetchMovies(currentPageNo);
	}, []);

	return (
		<div className='space-y-3 p-5'>
			{movies.map((movie) => {
				return <MovieListItem movie={movie} key={movie.id} />;
			})}
			<PrevAndNextBtn
				className='mt-5'
				onPrevClick={handleOnPrevClick}
				onNextClick={handleOnNextClick}
			/>
		</div>
	);
};

export default Movies;
