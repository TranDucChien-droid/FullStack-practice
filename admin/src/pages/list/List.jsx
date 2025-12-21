import css from './List.module.css';
import { ProductService } from '../../services';
import uploadArea from '../../assets/upload_area.png';
import Button from '../../components/Button/Button';

export default function List() {
	const { data: products, isLoading } =
		ProductService.useGetAllProductService();
	const { mutate } = ProductService.useRemoveProductService();

	const { data: displayData = [] } = products?.data ?? {};

	const onDeleteRow = (id) => () => {
		mutate(id);
	};

	return (
		<div className={css['container']}>
			{isLoading ? (
				'Loading...'
			) : (
				<div className={css['table']}>
					{displayData.map((item) => (
						<div className={css['row']} key={item._id}>
							<img
								className={css['image-placeholder']}
								src={item?.image?.[0] ?? uploadArea}
								alt=""
							/>
							<span>{item.name}</span>
							<span>{item.description}</span>
							<span>{item.price}</span>
							<span>{item.sizes.join(" - ")}</span>
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
