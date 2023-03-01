import React from 'react';
import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from 'react-icons/bs';

const MovieListItem = ({ movie, OnDeleteClick, OnEditClick, OnOpenClick }) => {
	const { poster, title, genres = [], status } = movie;
	return (
		<table className='w-full border-b '>
			<tbody>
				<tr>
					<td>
						<div className='w-24'>
							<img className='w-full aspect-video' src={poster} alt={title} />
						</div>
					</td>
					<td className='w-full pl-5'>
						<div>
							<h1 className='text-lg font-semibold text-primary dark:text-white'>
								{title}
							</h1>
							<div className='space-x-1'>
								{genres.map((genre, i) => (
									<span
										key={genre + i}
										className='text-primary dark:text-white text-xs'>
										{genre}
									</span>
								))}
							</div>
						</div>
					</td>
					<td className='px-5'>
						<p className='text-primary dark:text-white'>{status}</p>
					</td>
					<td>
						<div className='flex items-center space-x-3 text-primary dark:text-white text-lg'>
							<button onClick={OnDeleteClick} type='button'>
								<BsTrash />
							</button>
							<button onClick={OnEditClick} type='button'>
								<BsPencilSquare />
							</button>
							<button onClick={OnOpenClick} type='button'>
								<BsBoxArrowUpRight />
							</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

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
