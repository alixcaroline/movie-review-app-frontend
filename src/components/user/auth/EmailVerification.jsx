import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { commonModelClasses } from '../../../utils/theme';
import Container from '../../Container';
import FormContainer from '../../form/FormContainer';
import Submit from '../../form/Submit';
import Title from '../../form/Title';
import { verifyUserEmail } from '../../../api/auth';
import { useNotification } from '../../../hooks';

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
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// check if otp are 6 numbers
		if (!isValidOTP(otp)) console.log('invalid otp');

		// otp are nubmbers, check otp in backend
		const { error, message } = await verifyUserEmail({
			// convert otp array to string berfore sending to backend
			OTP: otp.join(''),
			userId: user.id,
		});

		if (error) updateNotification('error', error);
		updateNotification('success', message);
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

					<Submit value='Verify account' />
				</form>
			</Container>
		</FormContainer>
	);
};

export default EmailVerification;
