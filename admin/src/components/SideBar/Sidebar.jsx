import { NavLink } from 'react-router-dom';
import css from './Sidebar.module.css';
import { RouterName } from '../../router/RouteNames';

export default function Sidebar() {
	return (
		<div className={css['container']}>
			<NavLink to={RouterName.ADMIN_ADD}>
				<p className={css['btn']}>Add items</p>
			</NavLink>
			<NavLink to={RouterName.ADMIN_LIST}>
				<p className={css['btn']}>List items</p>
			</NavLink>
			<NavLink to={RouterName.ADMIN_ORDER}>
				<p className={css['btn']}>Order</p>
			</NavLink>
		</div>
	);
}
