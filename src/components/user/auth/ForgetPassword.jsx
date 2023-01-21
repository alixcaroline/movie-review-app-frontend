import React from 'react';
import { useState } from 'react';
import { forgetPassword } from '../../../api/auth';
import { useNotification } from '../../../hooks';
import { isValidEmail } from '../../../utils/helper';
import { commonModelClasses } from '../../../utils/theme';
import Container from '../../Container';
import CustomLink from '../../CustomLink';
import FormContainer from '../../form/FormContainer';
import FormInput from '../../form/FormInput';
import Submit from '../../form/Submit';
import Title from '../../form/Title';

const ForgetPassword = () => {
	const [email, setEmail] = useState('');
	console.log(email);

	const { updateNotification } = useNotification();

	const handleChange = ({ target }) => {
		const { value } = target;
		setEmail(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isValidEmail(email))
			return updateNotification('error', 'Invalid email!');
		const { error, message } = await forgetPassword(email);
		if (error) return updateNotification('error', error);
		updateNotification('success', message);
	};

	return (
		<FormContainer>
			<Container>
				<form onSubmit={handleSubmit} className={commonModelClasses + ' w-96'}>
					<Title>Please enter your email</Title>
					<FormInput
						name='email'
						placeholder='john@email.com'
						label='Email'
						onChange={handleChange}
						value={email}
					/>
					<Submit value='Send link' />
					<div className='flex justify-between'>
						<CustomLink to='/auth/signin'>Sign in</CustomLink>
						<CustomLink to='/auth/signup'>Sign up</CustomLink>
					</div>
				</form>
			</Container>
		</FormContainer>
	);
};

export default ForgetPassword;
