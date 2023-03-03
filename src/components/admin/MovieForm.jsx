import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNotification } from '../../hooks';
import { commonInputClasses } from '../../utils/theme';
import Submit from '../form/Submit';
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
import Label from '../Label';
import DirectorSelector from '../DirectorSelector';
import WritersSelector from '../WritersSelector';
import ViewAllButton from '../ViewAllButton';
import LabelWithBadge from './LabelWithBage';
import { validateMovie } from '../../utils/validator';

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

const MovieForm = ({ onSubmit, busy, initialState, btnTitle }) => {
	const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
	const [showWritersModal, setShowWritersModal] = useState(false);
	const [showCastModal, setShowCastModal] = useState(false);
	const [showGenresModal, setShowGenresModal] = useState(false);
	const [selectedPosterForUI, setSelectedPosterForUI] = useState('');

	const { updateNotification } = useNotification();

	const handleSubmit = (e) => {
		e.preventDefault();
		const { error } = validateMovie(movieInfo);
		if (error) return updateNotification('error', error);

		//convert MovieInfo to formData in string format so the backend can process it
		const { tags, genres, cast, director, poster } = movieInfo;

		const formData = new FormData();

		const finalMovieInfo = {
			...movieInfo,
		};

		finalMovieInfo.tags = JSON.stringify(tags);

		finalMovieInfo.genres = JSON.stringify(genres);

		const finalCast = cast.map((c) => {
			return { actor: c.profile.id, roleAs: c.roleAs, leadActor: c.leadActor };
		});
		finalMovieInfo.cast = JSON.stringify(finalCast);

		if (writers.length) {
			const finalWriters = writers.map((w) => w.id);
			finalMovieInfo.writers = JSON.stringify(finalWriters);
		}

		if (director) finalMovieInfo.director = director.id;

		if (poster) finalMovieInfo.poster = poster;

		for (let key in finalMovieInfo) {
			formData.append(key, finalMovieInfo[key]);
		}

		return onSubmit(formData);
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

	useEffect(() => {
		if (initialState) {
			setMovieInfo({
				...initialState,
				releaseDate: initialState.releaseDate.split('T')[0],
				poster: null,
			});
			setSelectedPosterForUI(initialState.poster);
		}
	}, [initialState]);

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
		releaseDate,
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

					<DirectorSelector onSelect={updateDirector} />

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
						<WritersSelector onSelect={updateWriters} />
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
						value={releaseDate}
					/>

					<Submit
						value={btnTitle}
						onClick={handleSubmit}
						type='button'
						busy={busy}
					/>
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
