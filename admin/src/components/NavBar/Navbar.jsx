import css from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

export default function Navbar() {
	const navigate = useNavigate();

	const onLogoutClick = () => {
		localStorage.removeItem('access_token');
		navigate('/login');
	};

	return (
		<div className={css['container']}>
			<img className={css['logo']} src={logo} />
			<Button onClick={onLogoutClick}>Logout</Button>
		</div>
	);
}
