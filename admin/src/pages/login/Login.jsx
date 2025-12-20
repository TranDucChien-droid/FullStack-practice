import { useRef } from 'react';
import css from './Login.module.css';
import Request from '../../services/Request';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../../components/Button/Button';

export default function Login() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const access_token = localStorage.getItem('access_token');
		if (access_token) {
			navigate('/');
		}
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const email = emailRef.current.value;
			const password = passwordRef.current.value;

			const payload = { email, password };

			const res = await Request({
				method: 'POST',
				url: 'user/admin/login',
				data: payload,
			});

			const {
				data: { token },
			} = res;

			localStorage.setItem('access_token', token);
			navigate('/');
		} catch (error) {
			console.log('error', error);
			throw new Error('error');
		}
	};

	return (
		<div className={css['container']}>
			<h1>
				<b>Admin Login</b>
			</h1>
			<form onSubmit={onSubmit} className={css['form-container']}>
				<input
					className={css['input']}
					type="email"
					placeholder="Enter Email"
					required
					ref={emailRef}
				/>
				<input
					className={css['input']}
					type="password"
					placeholder="Enter password"
					required
					ref={passwordRef}
				/>
				<Button type="submit">Login</Button>
			</form>
		</div>
	);
}
