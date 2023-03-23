const { catchError, getToken } = require('../utils/helper');
const { default: client } = require('./client');

export const getAppInfo = async () => {
	try {
		const token = getToken();
		const { data } = await client('/admin/app-info', {
			headers: {
				authorization: 'Bearer ' + token,
				'content-type': 'multipart/form-data',
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};

export const getMostRated = async () => {
	try {
		const token = getToken();
		const { data } = await client('/admin/most-rated', {
			headers: {
				authorization: 'Bearer ' + token,
				'content-type': 'multipart/form-data',
			},
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};
