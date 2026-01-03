import { NavLink, useNavigate } from 'react-router-dom';
import css from './NotFound.module.css';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function NotFound() {
	const navBackRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		navBackRef.current = setTimeout(() => {
			navigate('/');
		}, 5000);

		return () => {
			clearTimeout(navBackRef.current);
		};
	}, []);

	return (
		<div className={css['notfound']}>
			<div className={css['notfound-container']}>
				<h1>404</h1>
				<p>
					Oops! The page you’re looking for doesn’t exist. Navigate
					back after 5 seconds
				</p>
				<NavLink to={'/'}>Restore</NavLink>
			</div>
		</div>
	);
}
