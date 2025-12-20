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

const RequiredAuth = () => {
	const access_token = localStorage.getItem("access_token");
	const res = access_token ? jwtDecode(access_token) : {};

	if (access_token && res.isAdmin) {
		return <Outlet />;
	}

	return <Navigate to={'/login'} replace />;
};

const MainRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/" element={<RequiredAuth />}>
				<Route path="/" element={<App />}>
        			<Route index element={<Navigate to="add" replace />} />
					<Route path="/add" element={<Add />} />
					<Route path="/list" element={<List />} />
					<Route path="/order" element={<Order />} />
				</Route>
			</Route>
		</Routes>
	</BrowserRouter>
);

export default MainRouter;
