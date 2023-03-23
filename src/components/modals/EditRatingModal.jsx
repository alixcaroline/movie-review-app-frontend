import React, { useState } from 'react';
import RatingForm from '../form/RatingForm';
import ModalContainer from './ModalContainer';
import { useNotification } from '../../hooks';
import { updateReview } from '../../api/review';

const EditRatingModal = ({ visible, onClose, onSuccess, initialState }) => {
	const [busy, setBusy] = useState(false);
	const { updateNotification } = useNotification();

	const handleSubmit = async (data) => {
		setBusy(true);
		const { error, message } = await updateReview(initialState.id, data);

		setBusy(false);
		if (error) return updateNotification('error', error);

		onSuccess({ ...data });
		updateNotification('success', message);
		onClose();
	};

	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<RatingForm
				busy={busy}
				onSubmit={handleSubmit}
				initialState={initialState}
			/>
		</ModalContainer>
	);
};

export default EditRatingModal;
