import React from 'react';
import { commonModelClasses } from '../../../utils/theme';
import Container from '../../Container';
import CustomLink from '../../CustomLink';
import FormContainer from '../../form/FormContainer';
import FormInput from '../../form/FormInput';
import Submit from '../../form/Submit';
import Title from '../../form/Title';

const ForgetPassword = () => {
	return (
		<FormContainer>
			<Container>
				<form action='' className={commonModelClasses + ' w-96'}>
					<Title>Please enter your email</Title>
					<FormInput name='email' placeholder='john@email.com' label='Email' />
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