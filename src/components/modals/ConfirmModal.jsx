import React from 'react';
import { ImSpinner3 } from 'react-icons/im';
import ModalContainer from './ModalContainer';

const ConfirmModal = ({
	visible,
	busy,
	onConfirm,
	onCancel,
	title,
	subtitle,
}) => {
	const commonClasses = 'px-3 py-1 text-white rounded';
	return (
		<ModalContainer visible={visible} ignoreContainer>
			<div className='dark:bg-primary bg-white rounded p-3'>
				<h1 className='text-red-400 font-semibold text-lg'>{title}</h1>
				<p className='text-secondary dark:text-white text-sm'>{subtitle}</p>
				<div className='items-center space-x-3 flex mt-3'>
					{busy ? (
						<p className='flex items-center space-x-2 text-primary dark:text-white'>
							<ImSpinner3 />
							<span className='text-secondary dark:text-white'>
								Please wait
							</span>
						</p>
					) : (
						<>
							<button
								onClick={onConfirm}
								type='button'
								className={commonClasses + ' bg-red-400'}>
								Confirm
							</button>
							<button
								onClick={onCancel}
								type='button'
								className={commonClasses + ' bg-blue-400'}>
								Cancel
							</button>
						</>
					)}
				</div>
			</div>
		</ModalContainer>
	);
};

export default ConfirmModal;
