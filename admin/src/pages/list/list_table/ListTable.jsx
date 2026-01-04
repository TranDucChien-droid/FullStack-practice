import React from 'react';
import css from './ListTable.module.css';
import Button from '@/components/Button/Button';
import { ProductService } from '@/services';
import uploadArea from '@/assets/upload_area.png';

export default function ListTable({ data, isLoading }) {
	const { mutate } = ProductService.useRemoveProductService();

	const onDeleteRow = (id) => () => {
		mutate(id);
	};

	return (
		<div className={css['container']}>
			{isLoading ? (
				'Loading...'
			) : (
				<div className={css['table']}>
					{data.map((item) => (
						<div className={css['row']} key={item._id}>
							<img
								className={css['image-placeholder']}
								src={item?.image?.[0] ?? uploadArea}
								alt=""
							/>
							<span>{item.name}</span>
							<span>{item.description}</span>
							<span>{item.price}</span>
							<span>{item.sizes.join(' - ')}</span>
							<Button
								className={css['button']}
								onClick={onDeleteRow(item._id)}
							>
								Delete
							</Button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
