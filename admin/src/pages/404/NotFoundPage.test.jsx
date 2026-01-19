import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

// Mock the react-router-dom navigate function
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: vi.fn(),
	};
});

import { useNavigate } from 'react-router-dom';

describe('NotFoundPage', () => {
	let mockNavigate;

	beforeEach(() => {
		vi.useFakeTimers();
		mockNavigate = vi.fn();
		useNavigate.mockReturnValue(mockNavigate);
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
		vi.clearAllMocks();
	});

	it('should render the 404 page with heading and message', () => {
		render(
			<BrowserRouter>
				<NotFoundPage />
			</BrowserRouter>
		);

		expect(screen.getByText('404')).toBeInTheDocument();
		expect(
			screen.getByText(
				/Oops! The page you're looking for doesn't exist. Navigate back after 5 seconds/i
			)
		).toBeInTheDocument();
	});

	it('should render a restore link', () => {
		render(
			<BrowserRouter>
				<NotFoundPage />
			</BrowserRouter>
		);

		const restoreLink = screen.getByRole('link', { name: /Restore/i });
		expect(restoreLink).toBeInTheDocument();
		expect(restoreLink).toHaveAttribute('href', '/');
	});

	it('should have error-message id on the paragraph', () => {
		render(
			<BrowserRouter>
				<NotFoundPage />
			</BrowserRouter>
		);

		const errorMessage = screen.getByText(
			/Oops! The page you're looking for doesn't exist. Navigate back after 5 seconds/i
		);
		expect(errorMessage).toHaveAttribute('id', 'error-message');
	});

	it('should navigate to home after 5 seconds', () => {
		render(
			<BrowserRouter>
				<NotFoundPage />
			</BrowserRouter>
		);

		expect(mockNavigate).not.toHaveBeenCalled();

		// Fast-forward time by 5 seconds
		vi.advanceTimersByTime(5000);

		expect(mockNavigate).toHaveBeenCalledWith('/');
		expect(mockNavigate).toHaveBeenCalledTimes(1);
	});

	it('should cleanup timeout on unmount', () => {
		const { unmount } = render(
			<BrowserRouter>
				<NotFoundPage />
			</BrowserRouter>
		);

		// Unmount the component
		unmount();

		// Advance timers and verify navigate was not called
		// because the timeout should have been cleared
		vi.advanceTimersByTime(5000);

		expect(mockNavigate).not.toHaveBeenCalled();
	});

	it('should not navigate before 5 seconds', () => {
		render(
			<BrowserRouter>
				<NotFoundPage />
			</BrowserRouter>
		);

		vi.advanceTimersByTime(4999);

		expect(mockNavigate).not.toHaveBeenCalled();
	});
});
