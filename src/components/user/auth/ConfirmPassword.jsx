import React, { useEffect, useState } from 'react';
import { ImSpinner3 } from 'react-icons/im';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword, verifyPasswordResetToken } from '../../../api/auth';
import { useNotification } from '../../../hooks';
import { commonModelClasses } from '../../../utils/theme';
import Container from '../../Container';
import CustomLink from '../../CustomLink';
import FormContainer from '../../form/FormContainer';
import FormInput from '../../form/FormInput';
import Submit from '../../form/Submit';
import Title from '../../form/Title';

const ConfirmPassword = () => {
	const [password, setPassword] = useState({
		one: '',
		two: '',
	});
	const [isVerifying, setIsVerifying] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const id = searchParams.get('id');

	const { updateNotification } = useNotification();
	const navigate = useNavigate();

	useEffect(() => {
		isValidToken();
	}, []);

	const isValidToken = async () => {
		const { error, valid } = await verifyPasswordResetToken(token, id);
		setIsVerifying(false);

		if (error) {
			navigate('/auth/reset-password', { replace: true });
			return updateNotification('error', error);
		}

		if (!valid) {
			setIsValid(false);
			return navigate('/auth/reset-password', { replace: true });
		}

		setIsValid(true);
	};

	const handleChange = ({ target }) => {
		const { name, value } = target;

		setPassword({ ...password, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!password.one.trim())
			return updateNotification('error', 'Password is missing!');

		if (password.one.trim().length < 8)
			return updateNotification(
				'error',
				'Passwords must be 8 characters long!',
			);

		if (password.one !== password.two)
			return updateNotification('error', "Passwords don't match!");
		console.log(password);

		const { error, message } = await resetPassword({
			newPassword: password.one,
			userId: id,
			token,
		});

		console.log(token);

		if (error) return updateNotification('error', error);
		updateNotification('success', message);
		navigate('/auth/signin', { replace: true });
	};

	if (isVerifying)
		return (
			<FormContainer>
				<Container>
					<div className='flex flex-col space-y-5 items-center justify-center '>
						<h1 className='text-4xl font-semibold text-primary dark:text-white'>
							Please wait, we are verifying your token
						</h1>
						<ImSpinner3 className='animate-spin dark:text-white text-primary text-4xl' />
					</div>
				</Container>
			</FormContainer>
		);

	if (!isValid)
		return (
			<FormContainer>
				<Container>
					<h1 className='text-4xl font-semibold text-primary dark:text-white'>
						Sorry the token is invalid
					</h1>
				</Container>
			</FormContainer>
		);

	return (
		<FormContainer>
			<Container>
				<form onSubmit={handleSubmit} className={commonModelClasses + ' w-96'}>
					<Title>Enter new password</Title>
					<FormInput
						name='one'
						placeholder='********'
						label='Password'
						type='password'
						value={password.one}
						onChange={handleChange}
					/>
					<FormInput
						name='two'
						placeholder='********'
						label='Confirm password'
						type='password'
						value={password.two}
						onChange={handleChange}
					/>
					<Submit value='Confirm password' />
					<div className='flex justify-between'>
						<CustomLink to='/auth/signin'>Sign in</CustomLink>
						<CustomLink to='/auth/signup'>Sign up</CustomLink>
					</div>
				</form>
			</Container>
		</FormContainer>
	);
};

export default ConfirmPassword;
