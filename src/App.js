import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/user/Navbar';
import Signin from './components/user/auth/Signin';
import Signup from './components/user/auth/Signup';
import EmailVerification from './components/user/auth/EmailVerification';
import ForgetPassword from './components/user/auth/ForgetPassword';
import ConfirmPassword from './components/user/auth/ConfirmPassword';
import Home from './components/Home';
import NotFound from './components/user/NotFound';
import { useAuth } from './hooks';
import AdminNavigator from './navigator/AdminNavigator';

const App = () => {
	const { authInfo } = useAuth();
	const isAdmin = authInfo.profile?.role === 'admin';
	if (isAdmin) return <AdminNavigator />;
	return (
		<>
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth/signin' element={<Signin />} />
				<Route path='/auth/signup' element={<Signup />} />
				<Route path='/auth/verification' element={<EmailVerification />} />
				<Route path='/auth/forget-password' element={<ForgetPassword />} />
				<Route path='/auth/reset-password' element={<ConfirmPassword />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
