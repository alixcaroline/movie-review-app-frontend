import { useState } from 'react';
import { BsTrash, BsPencilSquare, BsBoxArrowUpRight } from 'react-icons/bs';
import { deleteMovie } from '../api/movie';
import { useNotification } from '../hooks';
import { getPoster } from '../utils/helper';
import ConfirmModal from './modals/ConfirmModal';
import UpdateMovie from './modals/UpdateMovie';

const MovieListItem = ({ movie, afterDelete, afterUpdate }) => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [selectedMovieId, setSelectedMovieId] = useState(null);
	const [busy, setBusy] = useState(false);

	const { updateNotification } = useNotification();

	const displayConfirmModal = () => setShowConfirmModal(true);

	const hideConfirmModal = () => setShowConfirmModal(false);

	const handleOnDeleteConfirm = async () => {
		setBusy(true);
		const { error, message } = await deleteMovie(movie.id);
		setBusy(false);
		if (error) return updateNotification('error', error);

		hideConfirmModal();
		updateNotification('success', message);
		afterDelete(movie);
	};

	const handleOnEditClick = () => {
		setSelectedMovieId(movie.id);
		setShowUpdateModal(true);
	};

	const handleOnUpdate = (movie) => {
		afterUpdate(movie);
		setShowUpdateModal(false);
		setSelectedMovieId(null);
	};

	return (
		<>
			<MovieCard
				movie={movie}
				onDeleteClick={displayConfirmModal}
				onEditClick={handleOnEditClick}
			/>
			<div className='p-0'>
				<ConfirmModal
					visible={showConfirmModal}
					onCancel={hideConfirmModal}
					onConfirm={handleOnDeleteConfirm}
					title='Are you sure?'
					subtitle='This action will remove this movie permanently'
					busy={busy}
				/>
				<UpdateMovie
					visible={showUpdateModal}
					onSuccess={handleOnUpdate}
					movieId={selectedMovieId}
				/>
			</div>
		</>
	);
};

const MovieCard = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
	const { poster, responsivePosters, title, genres = [], status } = movie;
	return (
		<table className='w-full border-b '>
			<tbody>
				<tr>
					<td>
						<div className='w-24'>
							<img
								className='w-full aspect-video'
								src={getPoster(responsivePosters) || poster}
								alt={title}
							/>
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
							<button onClick={onDeleteClick} type='button'>
								<BsTrash />
							</button>
							<button onClick={onEditClick} type='button'>
								<BsPencilSquare />
							</button>
							<button onClick={onOpenClick} type='button'>
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
