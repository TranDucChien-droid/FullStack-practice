import LoginForm from './login_form/LoginForm';
import css from './LoginPage.module.css';

export default function LoginPage() {
	return (
		<div className={css['container']}>
			<LoginForm />
		</div>
	);
}
