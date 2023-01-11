import React from 'react';
import Container from '../../Container';
import CustomLink from '../../CustomLink';
import FormInput from '../../form/FormInput';
import Submit from '../../form/Submit';
import Title from '../../form/Title';

const ForgetPassword = () => {
	return (
		<div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
			<Container>
				<form action='' className='bg-secondary rounded p-6 w-96 space-y-6'>
					<Title>Please enter your email</Title>
					<FormInput name='email' placeholder='john@email.com' label='Email' />
					<Submit value='Send link' />
					<div className='flex justify-between'>
						<CustomLink to='/auth/signin'>Sign in</CustomLink>
						<CustomLink to='/auth/signup'>Sign up</CustomLink>
					</div>
				</form>
			</Container>
		</div>
	);
};

export default ForgetPassword;
