import { catchError, getToken } from '../utils/helper';
import client from './client';

export const createActor = async (formData, onUploadProgress) => {
	const token = getToken();
	try {
		const { data } = await client.post('actor/create', formData, {
			headers: {
				authorization: 'Bearer ' + token,
				'content-type': 'multipart/form-data',
			},
		});
		return data;
	} catch (error) {
		const { response } = error;
		return catchError(error);
	}
};
