import React, { useState } from 'react';
import { useNotification } from '../../hooks';
import ModalContainer from './ModalContainer';
import ActorForm from '../form/ActorForm';
import { updateActor } from '../../api/actor';

const UpdateActor = ({ visible, onClose, initialState, onSuccess }) => {
	const [busy, setBusy] = useState(false);

	const { updateNotification } = useNotification();

	const handleSubmit = async (data) => {
		setBusy(true);
		const { error, actor } = await updateActor(initialState.id, data);
		setBusy(false);
		if (error) return updateNotification('error', error);
		onSuccess(actor);
		updateNotification('success', `${actor.name} updated successfully`);
		onClose();
	};
	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<ActorForm
				title='Update Actor'
				btnTitle='Update'
				onSubmit={!busy ? handleSubmit : null}
				busy={busy}
				initialState={initialState}
			/>
		</ModalContainer>
	);
};

export default UpdateActor;
