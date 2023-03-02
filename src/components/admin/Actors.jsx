import React, { useEffect, useState } from 'react';
import { useNotification } from '../../hooks/index';
import { BsTrash, BsPencilSquare } from 'react-icons/bs';
import { getActors } from '../../api/actor';
import PrevAndNextBtn from '../PrevAndNextBtn';

const Options = ({ visible, onDeleteClick, onEditClick }) => {
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

const ActorProfile = ({ profile }) => {
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
				<Options visible={showOptions} />
			</div>
		</div>
	);
};

let currentPageNo = 0;
let limit = 1;

const Actors = () => {
	const [actors, setActors] = useState([]);
	const [reachedToEnd, setReachedToEnd] = useState(false);

	const { updateNotification } = useNotification();

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

	useEffect(() => {
		fetchActors(currentPageNo);
	}, []);

	return (
		<div className='p-5'>
			<div className='grid grid-cols-4 gap-5'>
				{actors.map((actor) => (
					<ActorProfile profile={actor} key={actor.id} />
				))}
			</div>
			<PrevAndNextBtn
				className='mt-5'
				onPrevClick={handleOnPrevClick}
				onNextClick={handleOnNextClick}
			/>
		</div>
	);
};

export default Actors;
