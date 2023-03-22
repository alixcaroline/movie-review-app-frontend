import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { getLatestUploads } from '../../api/movie';
import { useNotification } from '../../hooks';

const SlideShowController = ({ onPrevClick, onNextClick }) => {
	const btnClasses =
		'bg-primary rounded border-2 text-white text-xl p-2 outline-none';
	return (
		<div className='absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2'>
			<button onClick={onPrevClick} type='button' className={btnClasses}>
				<AiOutlineDoubleLeft />
			</button>
			<button onClick={onNextClick} type='button' className={btnClasses}>
				<AiOutlineDoubleRight />
			</button>
		</div>
	);
};

let count = 0;

const HeroSlideShow = () => {
	const [currentSlide, setCurrentSlide] = useState({});
	const [clonedSlide, setClonedSlide] = useState({});
	const [slides, setSlides] = useState([]);
	const slideRef = useRef();
	const clonedSlideRef = useRef();

	const { updateNotification } = useNotification();

	const fetchLatestUploads = async () => {
		const { error, movies } = await getLatestUploads();
		if (error) return updateNotification('error', error);
		setSlides([...movies]);
		setCurrentSlide(movies[0]);
	};

	const handleOnNextClick = () => {
		setClonedSlide(slides[count]);
		count = (count + 1) % slides.length;
		setCurrentSlide(slides[count]);
		slideRef.current.classList.add('slide-in-from-right');
		clonedSlideRef.current.classList.add('slide-out-to-left');
	};

	const handleOnPrevClick = () => {
		setClonedSlide(slides[count]);
		count = (count + slides.length - 1) % slides.length;
		console.log(count);
		setCurrentSlide(slides[count]);
		slideRef.current.classList.add('slide-in-from-left');
		clonedSlideRef.current.classList.add('slide-out-to-right');
	};

	const handleAnimationEnd = () => {
		const classes = [
			'slide-in-from-right',
			'slide-out-to-left',
			'slide-in-from-left',
			'slide-out-to-right',
		];
		slideRef.current.classList.remove(...classes);
		clonedSlideRef.current.classList.remove(...classes);

		setClonedSlide({});
	};
	useEffect(() => {
		fetchLatestUploads();
	}, []);

	return (
		<div className='w-full flex'>
			{/* slide show section */}
			<div className='w-4/5 aspect-video relative overflow-hidden'>
				<img
					onAnimationEnd={handleAnimationEnd}
					ref={slideRef}
					className='aspect-video object-cover'
					src={currentSlide.poster}
					alt=''
				/>
				<img
					onAnimationEnd={handleAnimationEnd}
					ref={clonedSlideRef}
					className='aspect-video object-cover absolute inset-0'
					src={clonedSlide.poster}
					alt=''
				/>
				<SlideShowController
					onNextClick={handleOnNextClick}
					onPrevClick={handleOnPrevClick}
				/>
			</div>

			{/* up next section */}

			<div className='w-1/5 aspect-video bg-red-300'></div>
		</div>
	);
};

export default HeroSlideShow;
