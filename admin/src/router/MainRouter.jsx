import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom';
import AddPage from '../pages/add/AddPage';
import ListPage from '../pages/list/ListPage';
import OrderPage from '../pages/order/OrderPage';
import LoginPage from '../pages/login/LoginPage';
import App from '../App';
import { jwtDecode } from 'jwt-decode';
import { RouterName } from './RouteNames';
import NotFoundPage from '../pages/404/NotFoundPage';

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
			<Route path={RouterName.LOGIN} element={<LoginPage />}></Route>
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
					<Route path={RouterName.ADMIN_ADD} element={<AddPage />} />
					<Route path={RouterName.ADMIN_LIST} element={<ListPage />} />
					<Route path={RouterName.ADMIN_ORDER} element={<OrderPage />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

export default MainRouter;
