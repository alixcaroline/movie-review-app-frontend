import React from 'react';

const FormInput = ({ name, placeholder, label, ...rest }) => {
	return (
		<div className='flex flex-col-reverse'>
			<input
				name={name}
				id={name}
				className='bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle w-full text-lg outline-none dark:focus:border-white focus-border-primary p-1 dark:text-white text-secondary peer transition'
				placeholder={placeholder}
				{...rest}
			/>
			<label
				htmlFor={name}
				className='font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peer-focus:text-primary transition self-start'>
				{label}
			</label>
		</div>
	);
};

export default FormInput;
