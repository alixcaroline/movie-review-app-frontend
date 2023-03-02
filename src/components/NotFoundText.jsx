import React from 'react';

const NotFoundText = ({ text, visible }) => {
	if (!visible) return null;
	return (
		<h1 className='font-semibold text-3xl text-secondary dark:text-white opacity-40 text-center py-5'>
			{text}
		</h1>
	);
};

export default NotFoundText;
