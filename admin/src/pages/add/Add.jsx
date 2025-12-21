import { useState, useTransition } from 'react';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import TextField from '../../components/TextField/TextField';
import Upload from '../../components/Upload/Upload';
import css from './Add.module.css';
import { ProductService } from '../../services';
import classNames from 'classnames';

const initPayload = {
	name: '',
	description: '',
	price: 0,
	category: 'Men',
	subCategory: 'TopWear',
	sizes: JSON.stringify(['S', 'M', 'L']),
	bestSeller: false,
	date: Date.now(),
};

export default function Add() {
	const [, startTransition] = useTransition();
	const [payload, setPayload] = useState(initPayload);

	const { mutate, isPending } = ProductService.useAddProductService();

	const oneImageUploaded = (ev) => {
		setPayload({
			...payload,
			image: [...(payload.image ?? []), ev.target.files[0]],
		});
	};

	const onFieldChange = (ev) => {
		const nodeName = String(ev.target.nodeName).toLowerCase();
		if (nodeName === 'select') {
			const parsed = JSON.parse(ev.target.value);
			startTransition(() => {
				setPayload({ ...payload, [ev.target.id]: parsed.name });
			});
			return;
		}
		startTransition(() => {
			setPayload({ ...payload, [ev.target.id]: ev.target.value });
		});
	};

	const onFormSubmit = async (ev) => {
		ev.preventDefault();
		const { image, ...data } = { ...payload };
		const formData = new FormData();

		console.log(data);

		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		for (let i = 0; i < image.length; i++) {
			// Use the same key name for all files (e.g., 'files')
			formData.append('image', image[i]);
		}

		mutate(formData);
	};

	return (
		<div className={css['container']}>
			{isPending ? 'Loading...' : null}
			<form
				onSubmit={onFormSubmit}
				className={classNames({
					[css['form']]: true,
					[css['pointer-event-disabled']]: isPending,
				})}
			>
				<p>Upload file</p>
				<div className={css['form-images']}>
					<Upload
						onChange={oneImageUploaded}
						id={'image'}
						image={payload?.image?.[0]}
					/>
					<Upload
						onChange={oneImageUploaded}
						id={'image'}
						image={payload?.image?.[1]}
					/>
					<Upload
						onChange={oneImageUploaded}
						id={'image'}
						image={payload?.image?.[2]}
					/>
					<Upload
						onChange={oneImageUploaded}
						id={'image'}
						image={payload?.image?.[3]}
					/>
				</div>
				<div className={css['form-fields']}>
					<TextField
						onChange={onFieldChange}
						id={'name'}
						name={'Product name'}
					/>
					<TextField
						id={'description'}
						onChange={onFieldChange}
						name={'Product description'}
						type="area"
					/>
					<Select
						id={'category'}
						onChange={onFieldChange}
						name={'Product Category'}
						options={[
							{ name: 'Man', value: { name: 'Man' } },
							{ name: 'Woman', value: { name: 'Woman' } },
							{ name: 'Kid', value: { name: 'Kid' } },
						]}
					/>
					<Select
						id={'subCategory'}
						onChange={onFieldChange}
						name={'Sub Category'}
						options={[
							{ name: 'Topwear', value: { name: 'Topwear' } },
							{
								name: 'Bottomwear',
								value: { name: 'Bottomwear' },
							},
							{
								name: 'Winterwear',
								value: { name: 'Winterwear' },
							},
						]}
					/>
					<TextField
						id={'price'}
						onChange={onFieldChange}
						name={'Product price'}
						type="number"
					/>
					<Button type="submit">Add</Button>
				</div>
			</form>
		</div>
	);
}
