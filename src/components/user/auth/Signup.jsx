import React from 'react';
import { commonModelClasses } from '../../../utils/theme';
import Container from '../../Container';
import CustomLink from '../../CustomLink';
import FormContainer from '../../form/FormContainer';
import FormInput from '../../form/FormInput';
import Submit from '../../form/Submit';
import Title from '../../form/Title';

const Signup = () => {
	return (
		<FormContainer>
			<Container>
				<form action='' className={commonModelClasses + ' w-72'}>
					<Title>Sign up</Title>
					<FormInput name='name' placeholder='John Doe' label='Name' />
					<FormInput name='email' placeholder='john@email.com' label='Email' />
					<FormInput name='password' placeholder='********' label='Password' />
					<Submit value='Sign up' />
					<div className='flex justify-between'>
						<CustomLink to='/auth/forget-password'>Forget password</CustomLink>
						<CustomLink to='/auth/signin'>Sign in</CustomLink>
					</div>
				</form>
			</Container>
		</FormContainer>
	);
};

export default Signup;
