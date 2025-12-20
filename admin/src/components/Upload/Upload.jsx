import css from './Upload.module.css';
import uploadArea from '../../assets/upload_area.png';

export default function Upload({ id, image, onChange = (ev) => {} }) {
	return (
		<div className={css['container']}>
			<label htmlFor={id}>
				<img
					className={css['image-placeholder']}
					src={image ? URL.createObjectURL(image) : uploadArea}
					alt=""
				/>
				<input onChange={onChange} type="file" id={id} hidden />
			</label>
		</div>
	);
}
