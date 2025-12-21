import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainRouter from './router/MainRouter.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<MainRouter />
		</QueryClientProvider>
	</StrictMode>
);
