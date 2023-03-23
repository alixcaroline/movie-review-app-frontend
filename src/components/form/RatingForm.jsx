import React, { useEffect, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import Submit from './Submit';

const createArray = (count) => {
	return new Array(count).fill('');
};

const ratings = createArray(10);

const StarsOutlined = ({ ratings, onMouseEnter }) => {
	return ratings.map((_, index) => {
		return (
			<AiOutlineStar
				onMouseEnter={() => onMouseEnter(index)}
				className='cursor-pointer'
				key={index}
				size={24}
			/>
		);
	});
};

const StarsFilled = ({ ratings, onMouseEnter }) => {
	return ratings.map((_, index) => {
		return (
			<AiFillStar
				onMouseEnter={() => onMouseEnter(index)}
				className='cursor-pointer'
				key={index}
				size={24}
			/>
		);
	});
};

const RatingForm = ({ busy, onSubmit, initialState }) => {
	const [selectedRatings, setSelectedRatings] = useState([]);
	const [content, setContent] = useState('');

	const handleMouseEnter = (index) => {
		const ratings = createArray(index + 1);
		setSelectedRatings([...ratings]);
	};

	const handleOnChange = ({ target }) => {
		setContent(target.value);
	};

	const handleSubmit = () => {
		if (!selectedRatings.length) return;
		const data = {
			rating: selectedRatings.length,
			content,
		};

		onSubmit(data);
	};

	useEffect(() => {
		if (initialState) {
			setContent(initialState.content);
			setSelectedRatings(createArray(initialState.rating));
		}
	}, [initialState]);

	return (
		<div visible ignoreContainer>
			<div className='p-5 dark:bg-primary bg-white rounded space-y-3'>
				<div className='relative text-highlight dark:text-highlight-dark flex items-center'>
					<StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />

					<div className='flex absolute items-center top-1/2 -translate-y-1/2'>
						<StarsFilled
							ratings={selectedRatings}
							onMouseEnter={handleMouseEnter}
						/>
					</div>
				</div>

				<textarea
					value={content}
					onChange={handleOnChange}
					className='w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none'></textarea>

				<Submit busy={busy} onClick={handleSubmit} value='Rate This Movie' />
			</div>
		</div>
	);
};

export default RatingForm;
