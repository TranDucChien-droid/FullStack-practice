import css from './AddPage.module.css';
import AddForm from './components/AddForm';

export default function AddPage() {
	return (
		<div className={css['container']}>
			<AddForm />
		</div>
	);
}
