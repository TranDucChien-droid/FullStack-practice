import css from './AddPage.module.css';
import AddForm from './add_form/AddForm';

export default function AddPage() {
	return (
		<div className={css['container']}>
			<AddForm />
		</div>
	);
}
