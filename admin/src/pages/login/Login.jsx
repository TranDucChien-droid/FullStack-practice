import { useRef } from 'react';
import css from './Login.module.css';
import { useEffect } from 'react';
import Button from '../../components/Button/Button';
import { LoginService } from '../../services';

export default function Login() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const { mutate } = LoginService.useLoginService();

	useEffect(() => {
		const access_token = localStorage.getItem('access_token');
		if (access_token) {
			navigate('/');
		}
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();

		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		const payload = { email, password };
		mutate({ ...payload });
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
