import { Navigate, Route, Routes } from 'react-router-dom';
import Add from '../pages/add/Add';
import List from '../pages/list/List';
import Order from '../pages/order/Order';

const MainRouter = () => (
	<Routes>
		<Route path="/" element={<Navigate replace to="/add" />}></Route>
		<Route path="/add" element={<Add />}></Route>
		<Route path="/list" element={<List />}></Route>
		<Route path="/order" element={<Order />}></Route>
	</Routes>
);

export default MainRouter;
