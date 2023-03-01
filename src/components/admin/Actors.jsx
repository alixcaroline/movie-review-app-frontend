import React, { useState } from 'react';

import { BsTrash, BsPencilSquare } from 'react-icons/bs';

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
	const { avatar, name, about = '' } = profile;

	const handleOnMouseEnter = () => {
		setShowOptions(true);
	};

	const handleOnMouseLeave = () => {
		setShowOptions(false);
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
						{name}
					</h1>
					<p className='text-primary dark:text-white'>
						{about.substring(0, 50)}
					</p>
				</div>
				<Options visible={showOptions} />
			</div>
		</div>
	);
};

const Actors = () => {
	return (
		<div className='grid grid-cols-4 gap-3 my-5'>
			<ActorProfile
				profile={{
					avatar:
						'https://images.unsplash.com/photo-1594647210801-5124307f3d51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=crop&w=1064&q=80',
					name: 'Jane Doe',
					about: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ',
				}}
			/>
			<ActorProfile
				profile={{
					avatar:
						'https://images.unsplash.com/photo-1594647210801-5124307f3d51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=crop&w=1064&q=80',
					name: 'Jane Doe',
					about: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ',
				}}
			/>
			<ActorProfile
				profile={{
					avatar:
						'https://images.unsplash.com/photo-1594647210801-5124307f3d51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=crop&w=1064&q=80',
					name: 'Jane Doe',
					about: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ',
				}}
			/>
			<ActorProfile
				profile={{
					avatar:
						'https://images.unsplash.com/photo-1594647210801-5124307f3d51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=crop&w=1064&q=80',
					name: 'Jane Doe',
					about: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ',
				}}
			/>
		</div>
	);
};

export default Actors;
