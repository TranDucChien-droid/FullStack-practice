import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom';
import Add from '../pages/add/Add';
import List from '../pages/list/List';
import Order from '../pages/order/Order';
import Login from '../pages/login/Login';
import App from '../App';
import { jwtDecode } from 'jwt-decode';
import { RouterName } from './RouteNames';
import NotFound from '../pages/404/NotFound';

const RequiredAuth = () => {
	const access_token = localStorage.getItem('access_token');
	const res = access_token ? jwtDecode(access_token) : {};

	if (access_token && res.isAdmin) {
		return <Outlet />;
	}

	return <Navigate to={RouterName.LOGIN} replace />;
};

const MainRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path={RouterName.LOGIN} element={<Login />}></Route>
			<Route path="/" element={<RequiredAuth />}>
				<Route path="/" element={<App />}>
					<Route
						index
						element={<Navigate to={RouterName.ADMIN_ADD} replace />}
					/>
					<Route
						path={RouterName.ADMIN}
						element={<Navigate to={'add'} replace />}
					/>
					<Route path={RouterName.ADMIN_ADD} element={<Add />} />
					<Route path={RouterName.ADMIN_LIST} element={<List />} />
					<Route path={RouterName.ADMIN_ORDER} element={<Order />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

export default MainRouter;
