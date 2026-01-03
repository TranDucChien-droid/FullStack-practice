import ListTable from './components/ListTable';
import css from './ListPage.module.css';

export default function ListPage() {
	return (
		<div className={css['container']}>
			<ListTable />
		</div>
	);
}
