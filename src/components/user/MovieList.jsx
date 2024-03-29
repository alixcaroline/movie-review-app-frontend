import React from 'react';
import { Link } from 'react-router-dom';
import GridContainer from '../GridContainer';
import RatingStar from '../RatingStar';
import { getPoster } from '../../utils/helper';

const trimTitle = (text = '') => {
	if (text.length <= 20) return text;
	return text.substring(0, 20) + '...';
};

const ListItem = ({ movie }) => {
	const { title, poster, responsivePosters, reviews, id } = movie;
	return (
		<Link to={'/movie/' + id}>
			<img
				src={getPoster(responsivePosters) || poster}
				alt={title}
				className='aspect-video object-cover w-full'
			/>
			{title ? (
				<h1
					title={title}
					className='text-lg dark:text-white text-secondary font-semibold'>
					{trimTitle(title)}
				</h1>
			) : null}
			<RatingStar rating={reviews.ratingAvg} />
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
