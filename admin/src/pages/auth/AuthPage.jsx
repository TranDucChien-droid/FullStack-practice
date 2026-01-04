import LoginForm from './login_form/LoginForm';
import css from './AuthPage.module.css';

export default function AuthPage() {
	return (
		<div className={css['container']}>
			<LoginForm />
		</div>
	);
}
