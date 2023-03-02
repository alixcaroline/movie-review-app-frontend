import React from 'react';

const Btn = ({ title, onClick }) => {
	return (
		<button
			type='button'
			className='text-primary dark:text-white hover:underline'
			onClick={onClick}>
			{title}
		</button>
	);
};

const PrevAndNextBtn = ({ onPrevClick, onNextClick, className = '' }) => {
	const getClasses = () => {
		return 'flex justify-end items-center space-x-3 ';
	};
	return (
		<div className={getClasses() + className}>
			<Btn title='Prev' onClick={onPrevClick} />
			<Btn title='Next' onClick={onNextClick} />
		</div>
	);
};

export default PrevAndNextBtn;
