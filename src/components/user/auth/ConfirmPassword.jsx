import React from 'react';
import { commonModelClasses } from '../../../utils/theme';
import Container from '../../Container';
import CustomLink from '../../CustomLink';
import FormContainer from '../../form/FormContainer';
import FormInput from '../../form/FormInput';
import Submit from '../../form/Submit';
import Title from '../../form/Title';

const ConfirmPassword = () => {
	return (
		<FormContainer>
			<Container>
				<form action='' className={commonModelClasses + ' w-96'}>
					<Title>Enter new password</Title>
					<FormInput
						name='password'
						placeholder='********'
						label='Password'
						type='password'
					/>
					<FormInput
						name='confirmPassword'
						placeholder='********'
						label='Confirm password'
						type='password'
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
