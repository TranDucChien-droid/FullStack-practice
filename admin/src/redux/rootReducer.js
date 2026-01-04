import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthSlice from './auth/AuthSlice';

const rootReducers = combineReducers({
	auth: persistReducer(
		{
			key: 'auth',
			version: 1.0,
			storage,
			blacklist: [],
		},
		AuthSlice.reducer
	),
});

const persistedReducer = persistReducer(
	{
		key: 'root',
		storage,
		whitelist: [],
		version: 1.0,
	},
	rootReducers
);

export default persistedReducer;
