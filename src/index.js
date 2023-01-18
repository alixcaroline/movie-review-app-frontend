import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './context/ThemeProvider';

const RootElement = document.getElementById('root');
const root = ReactDOM.createRoot(RootElement);

root.render(
	<Router>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</Router>,
);
