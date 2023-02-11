import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { uploadTrailer } from '../../api/movie';
import { useNotification } from '../../hooks';
import MovieForm from './MovieForm';

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
	if (!visible) return null;

	return (
		<div className=' h-full flex items-center justify-center'>
			<FileUploader
				handleChange={handleChange}
				types={['mp4', 'avi']}
				onTypeError={onTypeError}>
				<div className='w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle flex flex-col rounded-full items-center justify-center text-light-subtle dark:text-dark-subtle cursor-pointer'>
					<AiOutlineCloudUpload size={80} />
					<p>Drop your files here!</p>
				</div>
			</FileUploader>
		</div>
	);
};

const UploadProgress = ({ message, width, visible }) => {
	if (!visible) return null;
	return (
		<div className='dark:bg-secondary bg-white drop-shadow-lg rounded p-3 overflow-hidden'>
			<div className='relative h-3 dark:bg-dark-subtle bg-light-subtle'>
				<div
					style={{ width: width + '%' }}
					className='h-full left-0 absolute bg-secondary dark:bg-white'
				/>
			</div>
			<p className='font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1'>
				{message}
			</p>
		</div>
	);
};

const MovieUpload = () => {
	const [videoUploaded, setVideoUploaded] = useState(false);
	const [videoSelected, setVideoSelected] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [videoInfo, setVideoInfo] = useState({});
	const { updateNotification } = useNotification();

	const handleUploadTrailer = async (data) => {
		const { error, url, public_id } = await uploadTrailer(
			data,
			setUploadProgress,
		);
		if (error) return updateNotification('error', error);

		setVideoUploaded(true);

		setVideoInfo({ url, public_id });
	};

	const handleChange = (file) => {
		const formData = new FormData();
		formData.append('video', file);
		setVideoSelected(true);
		handleUploadTrailer(formData);
	};

	const handleTypeError = (err) => {
		updateNotification('error', err);
	};

	const getUploadProgressValue = () => {
		//video is geupload naar de server, maar nog niet naar de cloud
		if (!videoUploaded && uploadProgress >= 100) {
			return 'Processing';
		}
		return `Upload progress ${uploadProgress}%`;
	};

	return (
		<div className='fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center'>
			<div className='dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto p-2'>
				{/* <UploadProgress
					visible={!videoUploaded && videoSelected}
					message={getUploadProgressValue()}
					width={uploadProgress}
				/>
				<TrailerSelector
					visible={!videoSelected}
					onTypeError={handleTypeError}
					handleChange={handleChange}
				/> */}
				<MovieForm />
			</div>
		</div>
	);
};

export default MovieUpload;