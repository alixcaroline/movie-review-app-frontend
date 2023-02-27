import React from 'react';
import { useState } from 'react';
import { useNotification } from '../../hooks';
import { commonInputClasses } from '../../utils/theme';
import Submit from '../form/Submit';
import LiveSearch from './LiveSearch';
import TagsInput from './TagsInput';
import WritersModal from '../modals/WritersModal';
import CastForm from '../form/CastForm';
import CastModal from '../modals/CastModal';
import PosterSelector from '../form/PosterSelector';
import GenresSelector from '../form/GenresSelector';
import GenresModal from '../modals/GenresModal';
import Selector from '../form/Selector';
import {
	typeOptions,
	statusOptions,
	languageOptions,
} from '../../utils/options';

export const results = [
	{
		id: '1',
		avatar:
			'https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'John Doe',
	},
	{
		id: '2',
		avatar:
			'https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'Chandri Anggara',
	},
	{
		id: '3',
		avatar:
			'https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'Amin RK',
	},
	{
		id: '4',
		avatar:
			'https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'Edward Howell',
	},
	{
		id: '5',
		avatar:
			'https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'Amin RK',
	},
	{
		id: '6',
		avatar:
			'https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
		name: 'Edward Howell',
	},
];

export const renderItem = (result) => {
	return (
		<div key={result.id} className='flex space-x-2 rounded overflow-hidden'>
			<img
				src={result.avatar}
				alt={result.name}
				className='w-16 h-16 object-cover'
			/>
			<p className='dark:text-white font-semibold'>{result.name}</p>
		</div>
	);
};

const defaultMovieInfo = {
	title: '',
	storyLine: '',
	tags: [],
	cast: [],
	director: {},
	writers: [],
	releaseDate: '',
	poster: null,
	genres: [],
	type: '',
	language: '',
	status: '',
};

const MovieForm = () => {
	const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
	const [showWritersModal, setShowWritersModal] = useState(false);
	const [showCastModal, setShowCastModal] = useState(false);
	const [showGenresModal, setShowGenresModal] = useState(false);
	const [selectedPosterForUI, setSelectedPosterForUI] = useState('');

	const { updateNotification } = useNotification();

	const Label = ({ children, htmlFor }) => {
		return (
			<label
				htmlFor={htmlFor}
				className='dark:text-dark-subtle text-light-subtle font-semibold'>
				{children}
			</label>
		);
	};

	const LabelWithBadge = ({ children, htmlFor, badge }) => {
		const renderBadge = () => {
			if (!badge) return null;
			return (
				<span className='dark:bg-dark-subtle bg-light-subtle absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center text-white translate-x-5 -translate-y-1 text-xs'>
					{badge <= 9 ? badge : '9+'}
				</span>
			);
		};
		return (
			<div className='relative'>
				<label
					htmlFor={htmlFor}
					className='dark:text-dark-subtle text-light-subtle font-semibold'>
					{children}
				</label>
				{renderBadge()}
			</div>
		);
	};

	const ViewAllButton = ({ children, onClick, visible }) => {
		if (!visible) return null;
		return (
			<button
				type='button'
				className='dark:text-white text-primary hover:underline transition'
				onClick={onClick}>
				{children}
			</button>
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(movieInfo);
	};

	const updatePosterForUI = (file) => {
		const url = URL.createObjectURL(file);
		setSelectedPosterForUI(url);
	};

	const handleChange = ({ target }) => {
		const { value, name, files } = target;

		if (name === 'poster') {
			const poster = files[0];
			updatePosterForUI(poster);
			return setMovieInfo({ ...movieInfo, poster });
		}
		setMovieInfo({ ...movieInfo, [name]: value });
	};

	const updateTags = (tags) => {
		setMovieInfo({ ...movieInfo, tags });
	};

	const updateDirector = (profile) => {
		setMovieInfo({ ...movieInfo, director: profile });
	};
	const updateCast = (castInfo) => {
		const { cast } = movieInfo;
		setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
	};

	const updateWriters = (profile) => {
		const { writers } = movieInfo;
		for (let writer of writers) {
			if (writer.id === profile.id) {
				return updateNotification(
					'warning',
					'This profile is already selected!',
				);
			}
		}
		setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
	};

	const hideWritersModal = () => {
		setShowWritersModal(false);
	};

	const displayWritersModal = () => {
		setShowWritersModal(true);
	};

	const hideCastModal = () => {
		setShowCastModal(false);
	};

	const displayCastModal = () => {
		setShowCastModal(true);
	};

	const hideGenresModal = () => {
		setShowGenresModal(false);
	};
	const displayGenresModal = () => {
		setShowGenresModal(true);
	};

	const handleWriterRemove = (profileId) => {
		const { writers } = movieInfo;
		const newWriters = writers.filter(({ id }) => id !== profileId);
		if (!newWriters.length) hideWritersModal();
		setMovieInfo({ ...movieInfo, writers: newWriters });
	};

	const handleCastRemove = (profileId) => {
		const { cast } = movieInfo;
		const newCast = cast.filter(({ profile }) => profile.id !== profileId);
		if (!newCast.length) hideCastModal();
		setMovieInfo({ ...movieInfo, cast: newCast });
	};

	const updateGenres = (genres) => {
		setMovieInfo({ ...movieInfo, genres });
	};

	const {
		title,
		storyLine,
		director,
		writers,
		cast,
		tags,
		genres,
		type,
		language,
		status,
	} = movieInfo;

	return (
		<>
			<div className='flex space-x-3 '>
				<div className='w-[70%] space-y-5'>
					<div>
						<Label htmlFor='title'>Title</Label>
						<input
							value={title}
							onChange={handleChange}
							name='title'
							id='title'
							type='text'
							className={
								commonInputClasses + ' border-b-2 font-semibold text-xl'
							}
							placeholder='Movie title'
						/>
					</div>
					<div>
						<Label htmlFor='storyLine'>Storyline</Label>
						<textarea
							value={storyLine}
							onChange={handleChange}
							name='storyLine'
							id='storyLine'
							placeholder='Movie storyline...'
							className={
								commonInputClasses + ' border-b-2 resize-none h-24'
							}></textarea>
					</div>

					<TagsInput name='tags' onChange={updateTags} value={tags} />

					<div>
						<Label htmlFor='director'>Director</Label>
						<LiveSearch
							name='director'
							value={director.name}
							placeholder='Search profile'
							results={results}
							renderItem={renderItem}
							onSelect={updateDirector}
							onChange={(e) => console.log(e)}
						/>
					</div>

					<div>
						<div className='flex justify-between'>
							<LabelWithBadge htmlFor='writers' badge={writers.length}>
								Writers
							</LabelWithBadge>
							<ViewAllButton
								onClick={displayWritersModal}
								visible={writers.length}>
								View all
							</ViewAllButton>
						</div>
						<LiveSearch
							name='writers'
							value={writers.map((writer) => writer.name)}
							placeholder='Search profile'
							results={results}
							renderItem={renderItem}
							onSelect={updateWriters}
							onChange={(e) => console.log(e)}
						/>
					</div>

					<div>
						<div className='flex justify-between'>
							<LabelWithBadge badge={cast.length}>
								Add Cast & Crew
							</LabelWithBadge>
							<ViewAllButton visible={cast.length} onClick={displayCastModal}>
								View all
							</ViewAllButton>
						</div>
						<CastForm onSubmit={updateCast} />
					</div>

					<input
						type='date'
						className={commonInputClasses + ' border-2 rounded p-1 w-auto'}
						onChange={handleChange}
						name='releaseDate'
					/>

					<Submit value='Upload' onClick={handleSubmit} type='button' />
				</div>

				<div className='w-[30%] space-y-5'>
					<PosterSelector
						label='Select Poster'
						name='poster'
						onChange={handleChange}
						selectedPoster={selectedPosterForUI}
						accept='image/jpg, image/jpeg, image/png'
					/>
					<GenresSelector onClick={displayGenresModal} badge={genres.length} />

					<Selector
						onChange={handleChange}
						name='type'
						value={type}
						options={typeOptions}
						label='Type'
					/>
					<Selector
						onChange={handleChange}
						name='language'
						value={language}
						options={languageOptions}
						label='Language'
					/>
					<Selector
						onChange={handleChange}
						name='status'
						value={status}
						options={statusOptions}
						label='Status'
					/>
				</div>
			</div>
			<WritersModal
				visible={showWritersModal}
				profiles={writers}
				onClose={hideWritersModal}
				onRemoveClick={handleWriterRemove}
			/>
			<CastModal
				visible={showCastModal}
				cast={cast}
				onClose={hideCastModal}
				onRemoveClick={handleCastRemove}
			/>
			<GenresModal
				visible={showGenresModal}
				onClose={hideGenresModal}
				onSubmit={updateGenres}
				previousSelection={genres}
			/>
		</>
	);
};

export default MovieForm;
