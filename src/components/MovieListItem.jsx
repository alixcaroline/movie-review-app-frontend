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

export default MovieListItem;
