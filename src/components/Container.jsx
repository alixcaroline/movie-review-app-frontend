import React from 'react';

const Container = ({ children, className }) => {
	return (
		<div className={'max-w-screen-xl mx-auto bg-transparent' + className}>
			{children}
		</div>
	);
};

export default Container;
