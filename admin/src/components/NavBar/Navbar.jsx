import css from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useAppDispatch } from '@/redux/store';
import { logout } from '@/redux/auth/AuthSlice';

export default function Navbar() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onLogoutClick = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<div className={css['container']}>
			<img className={css['logo']} src={logo} />
			<Button onClick={onLogoutClick}>Logout</Button>
		</div>
	);
}
