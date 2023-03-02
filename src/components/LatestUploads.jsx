import React from 'react';
import MovieListItem from './MovieListItem';

const LatestUploads = () => {
	return (
		<div className='bg-white shadow dark:bg-secondary p-5 rounded col-span-2'>
			<h1 className='font-semibold text-2xl text-primary dark:text-white'>
				Recent uploads
			</h1>

			<MovieListItem
				movie={{
					poster:
						'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
					title: 'Mr & Mrs Smith',
					genres: ['Drama', 'Action'],
					status: 'public',
				}}
			/>
		</div>
	);
};

export default LatestUploads;
