import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { getTopRatedMovies } from '../../api/movie';
import GridContainer from '../GridContainer';
import { useNotification } from '../../hooks';
import MovieList from './MovieList';

const TopRatedWebSeries = () => {
	const [movies, setMovies] = useState([]);
	const { updateNotification } = useNotification();

	const fetchMovies = async () => {
		const { error, movies } = await getTopRatedMovies('Web Series');
		if (error) return updateNotification('error', error);
		setMovies([...movies]);
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	return <MovieList movies={movies} title='Viewers choice (Web Series)' />;
};

export default TopRatedWebSeries;
