import { useState, useTransition } from 'react';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import TextField from '../../components/TextField/TextField';
import Upload from '../../components/Upload/Upload';
import css from './Add.module.css';
import { useEffect } from 'react';
import Request from '../../services/Request';

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

	const oneImageUploaded = (ev) => {
		setPayload({ ...payload, [ev.target.id]: ev.target.files[0] });
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
		try {
			const data = { ...payload };
			const formData = new FormData();

			Object.entries(data).forEach(([key, value]) => {
				formData.append(key, value);
			});

			const res = await Request({
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				url: 'product/add',
				data: formData,
			});
			
			console.log(res);
			
		} catch (error) {
			console.log('error', error);
			throw new Error('error');
		}
	};

	return (
		<div className={css['container']}>
			<form onSubmit={onFormSubmit} className={css['form']}>
				<p>Upload file</p>
				<div className={css['form-images']}>
					<Upload
						onChange={oneImageUploaded}
						id={'image1'}
						image={payload.image1}
					/>
					<Upload
						onChange={oneImageUploaded}
						id={'image2'}
						image={payload.image2}
					/>
					<Upload
						onChange={oneImageUploaded}
						id={'image3'}
						image={payload.image3}
					/>
					<Upload
						onChange={oneImageUploaded}
						id={'image4'}
						image={payload.image4}
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
