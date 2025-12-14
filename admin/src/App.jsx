import css from './App.module.css';
import Navbar from './components/NavBar/Navbar';
import Sidebar from './components/SideBar/Sidebar';
import MainRouter from './router/MainRouter';

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
				<MainRouter />
			</div>
		</div>
	);
}

export default App;
