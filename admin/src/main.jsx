import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainRouter from './router/MainRouter.jsx';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<QueryClientProvider client={queryClient}>
				<MainRouter />
			</QueryClientProvider>
		</PersistGate>
	</Provider>
);
