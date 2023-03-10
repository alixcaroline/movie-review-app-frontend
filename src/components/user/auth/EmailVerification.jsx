import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { commonModelClasses } from '../../../utils/theme';
import Container from '../../Container';
import FormContainer from '../../form/FormContainer';
import Submit from '../../form/Submit';
import Title from '../../form/Title';
import { resendOTP, verifyUserEmail } from '../../../api/auth';
import { useAuth, useNotification } from '../../../hooks';

const OTP_LENGTH = 6;
let currentOTPIndex;

const isValidOTP = (otp) => {
	let valid = false;
	for (let val of otp) {
		valid = !isNaN(parseInt(val));
		if (!valid) break;
	}
	return valid;
};

const EmailVerification = () => {
	const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
	const [activeOtpIndex, setActiveOtpIndex] = useState(0);

	const { isAuth, authInfo } = useAuth();
	const { isLoggedIn, profile } = authInfo;
	const isVerified = profile?.isVerified;

	//create a reference on the inputfield to make it possible to use the input field to know when to focus on it
	const inputRef = useRef();

	const { updateNotification } = useNotification();

	const { state } = useLocation();
	const user = state?.user;

	const navigate = useNavigate();

	const focusNextInputField = (index) => {
		setActiveOtpIndex(index + 1);
	};

	const focusPrevInputField = (index) => {
		let nextIndex;
		const diff = index - 1;
		nextIndex = diff !== 0 ? diff : 0;
		setActiveOtpIndex(nextIndex);
	};

	const handleOtpChange = ({ target }, index) => {
		const { value } = target;
		const newOtp = [...otp];
		//use substring to keep only the latest number in 1 input field
		newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);

		if (!value) focusPrevInputField(currentOTPIndex);
		else focusNextInputField(currentOTPIndex);

		setOtp([...newOtp]);
	};

	const handleOTPResend = async () => {
		const { error, message } = await resendOTP(user.id);

		if (error) return updateNotification('error', error);

		updateNotification('success', message);
	};

	const handleKeyDown = (e, index) => {
		currentOTPIndex = index;
		if (e.key === 'Backspace') {
			focusPrevInputField(currentOTPIndex);
		}
	};

	// if the active input field changes, focus on it
	useEffect(() => {
		inputRef.current?.focus();
	}, [activeOtpIndex]);

	useEffect(() => {
		if (!user) navigate('/not-found');
		if (isLoggedIn && isVerified) navigate('/');
	}, [user, isLoggedIn, isVerified]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// check if otp are 6 numbers
		if (!isValidOTP(otp)) updateNotification('error', 'invalid otp');

		// otp are nubmbers, check otp in backend
		const {
			error,
			message,
			user: userResponse,
		} = await verifyUserEmail({
			// convert otp array to string berfore sending to backend
			OTP: otp.join(''),
			userId: user.id,
		});

		if (error) updateNotification('error', error);
		updateNotification('success', message);
		localStorage.setItem('auth-token', userResponse.token);
		isAuth();
	};

	return (
		<FormContainer>
			<Container>
				<form onSubmit={handleSubmit} className={commonModelClasses}>
					<div>
						<Title>Please enter the OTP to verify your account</Title>
						<p className='text-center dark:text-dark-subtle text-light-subtle'>
							OTP has been sent to your email
						</p>
					</div>

					<div className='flex justify-center items-center space-x-4'>
						{otp.map((_, index) => {
							return (
								<input
									ref={activeOtpIndex === index ? inputRef : null}
									type='number'
									value={otp[index] || ''}
									key={index}
									onChange={handleOtpChange}
									onKeyDown={(e) => handleKeyDown(e, index)}
									className='w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary rounded bg-transparent outline-none text-center dark:text-white  text-primary font-semibold text-xl spin-button-none'
								/>
							);
						})}
					</div>

					<div>
						<Submit value='Verify account' />
						<button
							type='button'
							onClick={handleOTPResend}
							className='dark:text-white text-blue-500 font-semibold hover:underline mt-2'>
							I don't have an OTP
						</button>
					</div>
				</form>
			</Container>
		</FormContainer>
	);
};

export default EmailVerification;
