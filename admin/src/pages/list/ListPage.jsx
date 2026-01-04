import { ProductService } from '@/services';
import ListTable from './list_table/ListTable';
import css from './ListPage.module.css';
import { useState } from 'react';
import { DEFAULT_PAGINATION } from '@/utils/const';

export default function ListPage() {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

	const {
		data: products,
		isLoading,
		isFetching,
	} = ProductService.useGetAllProductService(pagination);

	const { data: displayData = [] } = products?.data ?? {};

	return (
		<div className={css['container']}>
			<ListTable
				data={displayData}
				isLoading={isLoading || isFetching}
			/>
		</div>
	);
}
