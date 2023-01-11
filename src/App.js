import React from 'react';
import Navbar from './components/user/Navbar';
import Signin from './components/user/auth/Signin';
import Signup from './components/user/auth/Signup';

const App = () => {
	return (
		<>
			<Navbar />
			<Signup />
		</>
	);
};

export default App;
