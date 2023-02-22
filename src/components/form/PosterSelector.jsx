import React from 'react';

const commonPosterUI =
	'flex justify-center items-center border border-dashed rounded aspect-video border-light-subtle dark:border-dark-subtle';

const PosterUI = () => {
	return (
		<div className={commonPosterUI}>
			<span className='dark:text-dark-subtle text-light-subtle'>
				Select Poster
			</span>
		</div>
	);
};

const PosterSelector = ({ name, selectedPoster, onChange, accept }) => {
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
						className={commonPosterUI + ' object-cover'}
						src={selectedPoster}
						alt=''
					/>
				) : (
					<PosterUI />
				)}
			</label>
		</div>
	);
};

export default PosterSelector;
