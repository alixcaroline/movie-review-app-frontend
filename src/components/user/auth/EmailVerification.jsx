import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import Container from '../../Container';
import Submit from '../../form/Submit';
import Title from '../../form/Title';

const OTP_LENGTH = 6;
let currentOTPIndex;

const EmailVerification = () => {
	const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
	const [activeOtpIndex, setActiveOtpIndex] = useState(0);

	//create a reference on the inputfield to make it possible to use the input field to know when to focus on it
	const inputRef = useRef();

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

	return (
		<div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
			<Container>
				<form action='' className='bg-secondary rounded p-6 space-y-6'>
					<div>
						<Title>Please enter the OTP to verify your account</Title>
						<p className='text-center text-dark-subtle'>
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
									className='w-12 h-12 border-2 border-dark-subtle focus:border-white rounded bg-transparent outline-none text-center text-white font-semibold text-xl spin-button-none'
								/>
							);
						})}
					</div>

					<Submit value='Verify account' />
				</form>
			</Container>
		</div>
	);
};

export default EmailVerification;
