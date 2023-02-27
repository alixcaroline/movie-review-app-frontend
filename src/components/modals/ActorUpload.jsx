import React, { useState } from 'react';
import { createActor } from '../../api/actor';
import { useNotification } from '../../hooks';
import ActorForm from '../form/ActorForm';
import ModalContainer from './ModalContainer';

const ActorUpload = ({ visible, onClose }) => {
	const [busy, setBusy] = useState(false);

	const { updateNotification } = useNotification();

	const handleSubmit = async (data) => {
		setBusy(true);
		const { error, actor } = await createActor(data);
		setBusy(false);
		if (error) return updateNotification('error', error);

		updateNotification('success', `${actor.name} created successfully`);
		onClose();
	};
	return (
		<ModalContainer visible={visible} onClose={onClose} ignoreContainer>
			<ActorForm
				title='Create new Actor'
				btnTitle='Create actor'
				onSubmit={!busy ? handleSubmit : null}
				busy={busy}
			/>
		</ModalContainer>
	);
};

export default ActorUpload;
