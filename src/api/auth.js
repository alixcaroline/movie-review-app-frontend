import client from './client';

export const createUser = async (userInfo) => {
	try {
		const { data } = await client.post('/user/create', userInfo);
		return data;
	} catch (error) {
		const { response } = error;
		console.log('error');
		if (response?.data) return response.data;

		return { error: error.message || error };
	}
};

export const verifyUserEmail = async (userInfo) => {
	try {
		const { data } = await client.post('/user/verify-email', userInfo);
		return data;
	} catch (error) {
		const { response } = error;
		console.log(response.data);
		if (response?.data) return response.data;

		return { error: error.message || error };
	}
};
