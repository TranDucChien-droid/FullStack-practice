import css from './Navbar.module.css';
import logo from '../../assets/logo.png';

export default function Navbar() {
	return (
		<div className={css['container']}>
			<img className={css['logo']} src={logo} />
			<button className={css['btn']}>Logout</button>
		</div>
	);
}
