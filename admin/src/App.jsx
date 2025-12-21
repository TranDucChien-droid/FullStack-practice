import css from './App.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import Sidebar from './components/SideBar/Sidebar';

export const backendURL = import.meta.env.VITE_BACKEND_URL;

function App() {
	return (
		<div className={css['main-container']}>
			<div className={css['navbar']}>
				<Navbar />
			</div>
			<div className={css['sidebar']}>
				<Sidebar />
			</div>
			<div className={css['content']}>
				<Outlet />
			</div>
			<div className={css['footer']}>Footer</div>
		</div>
	);
}

export default App;
