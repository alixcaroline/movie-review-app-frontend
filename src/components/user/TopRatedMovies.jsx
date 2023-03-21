import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { getTopRatedMovies } from '../../api/movie';
import GridContainer from '../GridContainer';
import { useNotification } from '../../hooks';
import MovieList from './MovieList';

const TopRatedMovies = () => {
	const [movies, setMovies] = useState([]);
	const { updateNotification } = useNotification();

	const fetchMovies = async () => {
		const { error, movies } = await getTopRatedMovies();
		if (error) return updateNotification('error', error);
		setMovies([...movies]);
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	return <MovieList movies={movies} title='Viewers choice (Movies)' />;
};

export default TopRatedMovies;
