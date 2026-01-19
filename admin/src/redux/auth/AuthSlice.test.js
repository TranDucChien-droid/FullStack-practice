import { describe, it, expect } from 'vitest';
import AuthSlice, { updateToken, logout } from './AuthSlice';

describe('AuthSlice', () => {
	const initialState = {
		access_token: null,
		user: null,
	};

	describe('initial state', () => {
		it('should return the initial state', () => {
			const state = AuthSlice.reducer(undefined, { type: '@@INIT' });
			expect(state).toEqual(initialState);
		});
	});

	describe('updateToken reducer', () => {
		it('should update access_token with payload', () => {
			const mockToken = 'test-token-12345';
			const action = updateToken({ access_token: mockToken });
			const state = AuthSlice.reducer(initialState, action);

			expect(state.access_token).toBe(mockToken);
			expect(state.user).toBeNull();
		});

		it('should handle updating token when user already exists', () => {
			const existingState = {
				access_token: 'old-token',
				user: { id: 1, name: 'John' },
			};
			const mockToken = 'new-token-12345';
			const action = updateToken({ access_token: mockToken });
			const state = AuthSlice.reducer(existingState, action);

			expect(state.access_token).toBe(mockToken);
			expect(state.user).toEqual({ id: 1, name: 'John' });
		});

		it('should handle undefined payload gracefully', () => {
			const action = updateToken({});
			const state = AuthSlice.reducer(initialState, action);

			expect(state.access_token).toBeUndefined();
		});
	});

	describe('logout reducer', () => {
		it('should clear user and access_token', () => {
			const existingState = {
				access_token: 'test-token',
				user: { id: 1, name: 'John', email: 'john@example.com' },
			};
			const action = logout();
			const state = AuthSlice.reducer(existingState, action);

			expect(state.user).toBeNull();
			expect(state.access_token).toBeNull();
		});

		it('should reset to initial state on logout', () => {
			const existingState = {
				access_token: 'test-token',
				user: { id: 1, name: 'John' },
			};
			const action = logout();
			const state = AuthSlice.reducer(existingState, action);

			expect(state).toEqual(initialState);
		});

		it('should handle logout when already in initial state', () => {
			const action = logout();
			const state = AuthSlice.reducer(initialState, action);

			expect(state).toEqual(initialState);
		});
	});

	describe('actions', () => {
		it('should create updateToken action', () => {
			const payload = { access_token: 'token-123' };
			const action = updateToken(payload);

			expect(action.type).toBe('auth/updateToken');
			expect(action.payload).toEqual(payload);
		});

		it('should create logout action', () => {
			const action = logout();

			expect(action.type).toBe('auth/logout');
		});
	});
});
