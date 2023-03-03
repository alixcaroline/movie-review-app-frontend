import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMoviesForAdmin } from '../../api/movie';
import { useNotification } from '../../hooks/index';
import MovieListItem from '../MovieListItem';
import NotFoundText from '../NotFoundText';

const SearchMovies = () => {
	const [movies, setMovies] = useState([]);
	const [resultNotFound, setResultNotFound] = useState(false);

	const [searchParams] = useSearchParams();

	const query = searchParams.get('title');
	const { updateNotification } = useNotification();

	const searchMovies = async (value) => {
		const { error, results } = await searchMoviesForAdmin(value);
		if (error) return updateNotification('error', error);

		if (!results.length) {
			setResultNotFound(true);
			return setMovies([]);
		}
		setResultNotFound(false);
		setMovies([...results]);
	};

	useEffect(() => {
		if (query.trim()) searchMovies(query);
	}, [query]);
	return (
		<div className='p-5 space-y-3'>
			<NotFoundText text='Record not found' visible={resultNotFound} />
			{!resultNotFound &&
				movies.map((movie) => <MovieListItem movie={movie} key={movie.id} />)}
		</div>
	);
};

export default SearchMovies;
