import { NavLink } from 'react-router-dom';
import css from './Sidebar.module.css';

export default function Sidebar() {
	return (
		<div className={css['container']}>
			<NavLink to="/add">
				<p className={css['btn']}>Add items</p>
			</NavLink>
			<NavLink to="/list">
				<p className={css['btn']}>List items</p>
			</NavLink>
			<NavLink to="/order">
				<p className={css['btn']}>Order</p>
			</NavLink>
		</div>
	);
}
