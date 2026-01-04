import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	access_token: null,
	// refresh_token: null,
	user: null,
};
const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		updateToken: (state, action) => {
			state.access_token = action?.payload?.access_token;
			// state.refresh_token = action?.payload?.refresh_token;
		},
		logout: (state) => {
			state.user = null;
			state.access_token = null;
			// state.refresh_token = null;
		},
	},
	extraReducers() {},
});

export const { updateToken, logout } = AuthSlice.actions;
export default AuthSlice;
