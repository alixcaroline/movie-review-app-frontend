import React from 'react';

const Submit = ({ value }) => {
	return (
		<input
			type='submit'
			className='w-full rounded bg-white hover:bg-opacity-90 transition font-semibold text-lg text-secondary cursor-pointer p-1'
			value={value}
		/>
	);
};

export default Submit;
