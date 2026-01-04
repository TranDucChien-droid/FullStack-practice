import React, { useEffect, useRef } from 'react';
import css from './LoginForm.module.css';
import { LoginService } from '@/services';
import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/store';

export default function LoginForm() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const navigate = useNavigate();

	const access_token = useAppSelector((state) => state.auth.access_token);

	const { mutate } = LoginService.useLoginService();

	const onSubmit = async (e) => {
		e.preventDefault();

		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		const payload = { email, password };
		mutate({ ...payload });
	};

	useEffect(() => {
		if (access_token) {
			navigate('/');
		}
	}, [access_token]);

	if (access_token) return;

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
