import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './context/ThemeProvider';
import NotificationProvider from './context/NotificationProvider';

const RootElement = document.getElementById('root');
const root = ReactDOM.createRoot(RootElement);

root.render(
	<Router>
		<NotificationProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</NotificationProvider>
	</Router>,
);
