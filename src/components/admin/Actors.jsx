import React, { useEffect, useState } from 'react';
import { useNotification, useSearch } from '../../hooks/index';
import { BsTrash, BsPencilSquare } from 'react-icons/bs';
import { deleteActor, getActors, searchActor } from '../../api/actor';
import PrevAndNextBtn from '../PrevAndNextBtn';
import UpdateActor from '../modals/UpdateActor';
import AppSearchForm from '../form/AppSearchForm';
import NotFoundText from '../NotFoundText';
import ConfirmModal from '../modals/ConfirmModal';

const Options = ({ visible, onEditClick, onDeleteClick }) => {
	if (!visible) return null;
	return (
		<div className='absolute inset-0 h-20 bg-primary bg-opacity-25 backdrop-blur-sm flex items-center justify-center space-x-5'>
			<button
				onClick={onDeleteClick}
				className='p-2 rounded-full bg-white text-primary hover:opacity-80 transition'
				type='button'>
				<BsTrash />
			</button>
			<button
				onClick={onEditClick}
				className='p-2 rounded-full bg-white text-primary hover:opacity-80 transition'
				type='button'>
				<BsPencilSquare />
			</button>
		</div>
	);
};

const ActorProfile = ({ profile, onEditClick, onDeleteClick }) => {
	const [showOptions, setShowOptions] = useState(false);
	const acceptedNameLength = 15;
	const { avatar, name, about = '' } = profile;

	const handleOnMouseEnter = () => {
		setShowOptions(true);
	};

	const handleOnMouseLeave = () => {
		setShowOptions(false);
	};

	const getName = (name) => {
		if (name.length <= acceptedNameLength) return name;
		return name.substring(0, acceptedNameLength) + '...';
	};

	if (!profile) return null;
	return (
		<div className='bg-white dark:bg-secondary shadow rounded h-20 overflow-hidden'>
			<div
				onMouseEnter={handleOnMouseEnter}
				onMouseLeave={handleOnMouseLeave}
				className='flex cursor-pointer relative'>
				<img
					src={avatar}
					alt={name}
					className='w-20 aspect-square object-cover'
				/>
				<div className='px-2'>
					<h1 className='text-lg text-primary dark:text-white font-semibold'>
						{getName(name)}
					</h1>
					<p className='text-primary dark:text-white opacity-75'>
						{about.substring(0, 50)}
					</p>
				</div>
				<Options
					onEditClick={onEditClick}
					onDeleteClick={onDeleteClick}
					visible={showOptions}
				/>
			</div>
		</div>
	);
};

let currentPageNo = 0;
let limit = 3;

const Actors = () => {
	const [actors, setActors] = useState([]);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [busy, setBusy] = useState(false);
	const [reachedToEnd, setReachedToEnd] = useState(false);
	const [selectedProfile, setSelectedProfile] = useState(null);
	const [results, setResults] = useState([]);

	const { updateNotification } = useNotification();
	const { handleSearch, resetSearch, resultNotFound } = useSearch();

	const fetchActors = async (pageNo) => {
		const { profiles, error } = await getActors(pageNo, limit);
		if (error) return updateNotification('error', error);

		if (!profiles.length) {
			currentPageNo = pageNo - 1;
			return setReachedToEnd(true);
		}

		setActors([...profiles]);
	};

	const handleOnNextClick = () => {
		if (reachedToEnd) return;
		currentPageNo += 1;
		fetchActors(currentPageNo);
	};

	const handleOnPrevClick = () => {
		if (currentPageNo <= 0) return;
		if (reachedToEnd) setReachedToEnd(false);

		currentPageNo -= 1;
		fetchActors(currentPageNo);
	};

	const handleOnEditClick = (profile) => {
		setShowUpdateModal(true);
		setSelectedProfile(profile);
	};

	const hideUpdateModal = () => {
		setShowUpdateModal(false);
	};

	const handleOnActorUpdate = (profile) => {
		const updatedActors = actors.map((actor) => {
			if (profile.id === actor.id) {
				return profile;
			}
			return actor;
		});
		setActors([...updatedActors]);
	};

	const handleOnSearchSubmit = (value) => {
		handleSearch(searchActor, value, setResults);
	};

	const handleSearchFormReset = () => {
		setResults([]);
		resetSearch();
	};

	const handleOnDeleteClick = (profile) => {
		setSelectedProfile(profile);
		setShowConfirmModal(true);
	};

	const handleOnDeleteConfirm = async () => {
		// setBusy(true);
		// const { error, message } = await deleteActor(selectedProfile.id);
		// setBusy(false);
		// if (error) return updateNotification('error', error);
		// updateNotification('success', message);
		hideConfirmModal();
		// fetchActors(currentPageNo, limit);
	};

	const hideConfirmModal = () => {
		setShowConfirmModal(false);
	};

	useEffect(() => {
		fetchActors(currentPageNo);
	}, []);

	return (
		<>
			<div className='p-5'>
				<div className='flex justify-end mb-5'>
					<AppSearchForm
						onReset={handleSearchFormReset}
						showResetIcon={results.length || resultNotFound}
						onSubmit={handleOnSearchSubmit}
						placeholder='Search actor...'
					/>
				</div>
				<NotFoundText text='Record not found' visible={resultNotFound} />

				<div className='grid grid-cols-4 gap-5'>
					{results.length || resultNotFound
						? results.map((actor) => (
								<ActorProfile
									profile={actor}
									key={actor.id}
									onEditClick={() => handleOnEditClick(actor)}
									onDeleteClick={() => handleOnDeleteClick(actor)}
								/>
						  ))
						: actors.map((actor) => (
								<ActorProfile
									profile={actor}
									key={actor.id}
									onEditClick={() => handleOnEditClick(actor)}
									onDeleteClick={() => handleOnDeleteClick(actor)}
								/>
						  ))}
				</div>

				{!results.length && !resultNotFound ? (
					<PrevAndNextBtn
						className='mt-5'
						onPrevClick={handleOnPrevClick}
						onNextClick={handleOnNextClick}
					/>
				) : null}
			</div>

			<ConfirmModal
				busy={busy}
				visible={showConfirmModal}
				title='Are you sure?'
				subtitle={'This action will remove this profile permanently'}
				onConfirm={handleOnDeleteConfirm}
				onCancel={hideConfirmModal}
			/>

			<UpdateActor
				visible={showUpdateModal}
				onClose={hideUpdateModal}
				initialState={selectedProfile}
				onSuccess={handleOnActorUpdate}
			/>
		</>
	);
};

export default Actors;
