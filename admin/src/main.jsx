import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainRouter from './router/MainRouter.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<MainRouter />
	</StrictMode>
);
