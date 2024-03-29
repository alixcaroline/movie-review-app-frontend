import React from 'react';

const CustomBtnLink = ({ label, clickable = true, onClick }) => {
	const className = clickable
		? 'text-highlight dark:text-highlight-dark hover:underline'
		: 'text-highlight dark:text-highlight-dark cursor-default';
	return (
		<button onClick={onClick} type='button' className={className}>
			{label}
		</button>
	);
};

export default CustomBtnLink;
