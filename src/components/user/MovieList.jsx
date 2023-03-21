import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import GridContainer from '../GridContainer';

const trimTitle = (text = '') => {
	if (text.length <= 20) return text;
	return text.substring(0, 20) + '...';
};

const ListItem = ({ movie }) => {
	const { title, poster, reviews, id } = movie;
	return (
		<Link to={'/movie/' + id}>
			<img src={poster} alt={title} className='aspect-video object-cover' />
			<h1
				title={title}
				className='text-lg dark:text-white text-secondary font-semibold'>
				{trimTitle(title)}
			</h1>
			{reviews.ratingAvg ? (
				<p className='flex items-center space-x-1 text-highlight dark:text-highlight-dark'>
					<span>{reviews.ratingAvg}</span>
					<AiFillStar />
				</p>
			) : (
				<p className=' text-highlight dark:text-highlight-dark'>No reviews</p>
			)}
		</Link>
	);
};

const MovieList = ({ movies = [], title }) => {
	if (!movies.length) return null;
	return (
		<div>
			<h1 className='text-2xl dark:text-white text-secondary font-semibold mb-5'>
				{title}
			</h1>
			<GridContainer>
				{movies.map((movie) => {
					return <ListItem key={movie.id} movie={movie} />;
				})}
			</GridContainer>
		</div>
	);
};

export default MovieList;
