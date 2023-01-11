import React from 'react';

const FormInput = ({ name, placeholder, label, ...rest }) => {
	return (
		<div className='flex flex-col-reverse'>
			<input
				name={name}
				id={name}
				className='bg-transparent rounded border-2 border-dark-subtle w-full text-lg outline-none focus:border-white p-1 text-white peer transition'
				placeholder={placeholder}
				{...rest}
			/>
			<label
				htmlFor={name}
				className='font-semibold text-dark-subtle peer-focus:text-white transition self-start'>
				{label}
			</label>
		</div>
	);
};

export default FormInput;
