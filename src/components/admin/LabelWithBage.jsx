import Label from '../Label';

const LabelWithBadge = ({ children, htmlFor, badge }) => {
	const renderBadge = () => {
		if (!badge) return null;
		return (
			<span className='dark:bg-dark-subtle bg-light-subtle absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center text-white translate-x-5 -translate-y-1 text-xs'>
				{badge <= 9 ? badge : '9+'}
			</span>
		);
	};
	return (
		<div className='relative'>
			<Label
				htmlFor={htmlFor}
				className='dark:text-dark-subtle text-light-subtle font-semibold'>
				{children}
			</Label>
			{renderBadge()}
		</div>
	);
};

export default LabelWithBadge;
