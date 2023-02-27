import React from 'react';

const commonPosterUI =
	'flex justify-center items-center border border-dashed rounded aspect-video border-light-subtle dark:border-dark-subtle';

const PosterUI = ({ className, label }) => {
	return (
		<div className={commonPosterUI + ' ' + className}>
			<span className='dark:text-dark-subtle text-light-subtle'>{label}</span>
		</div>
	);
};

const PosterSelector = ({
	name,
	selectedPoster,
	onChange,
	accept,
	className,
	label,
}) => {
	return (
		<div>
			<input
				accept={accept}
				onChange={onChange}
				name={name}
				id={name}
				type='file'
				hidden
			/>
			<label htmlFor={name}>
				{selectedPoster ? (
					<img
						className={commonPosterUI + ' object-cover ' + className}
						src={selectedPoster}
						alt=''
					/>
				) : (
					<PosterUI className={className} label={label} />
				)}
			</label>
		</div>
	);
};

export default PosterSelector;
