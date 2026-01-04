import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { RouterName } from './RouteNames';
import App from '@/App';
import AuthPage from '@/pages/auth/AuthPage';
import AddPage from '@/pages/add/AddPage';
import ListPage from '@/pages/list/ListPage';
import OrderPage from '@/pages/order/OrderPage';
import NotFoundPage from '@/pages/404/NotFoundPage';
import { useAppSelector } from '@/redux/store';

const RequiredAuth = () => {
	const access_token = useAppSelector((state) => state.auth.access_token);
	const res = access_token ? jwtDecode(access_token) : {};

	if (access_token && res.isAdmin) {
		return <Outlet />;
	}

	return <Navigate to={RouterName.LOGIN} replace />;
};

const MainRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path={RouterName.LOGIN} element={<AuthPage />}></Route>
			<Route path="/" element={<RequiredAuth />}>
				<Route path="/" element={<App />}>
					<Route
						index
						element={
							<Navigate to={RouterName.ADMIN_LIST} replace />
						}
					/>
					<Route
						path={RouterName.ADMIN}
						element={<Navigate to={'list'} replace />}
					/>
					<Route path={RouterName.ADMIN_ADD} element={<AddPage />} />
					<Route
						path={RouterName.ADMIN_LIST}
						element={<ListPage />}
					/>
					<Route
						path={RouterName.ADMIN_ORDER}
						element={<OrderPage />}
					/>
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

export default MainRouter;
