import { slugify } from '../../utils/utils';
import css from './TextField.module.css';

export default function TextField({
	id,
	name,
	type = 'text',
	placeholder = 'Enter...',
	...props
}) {
	return (
		<div className={css['form-field-input']}>
			<span>{name}</span>
			{type === 'area' ? (
				<textarea
					id={id ?? slugify(name)}
					rows="5"
					cols="30"
					className={css['area']}
					placeholder={placeholder}
					{...props}
				/>
			) : (
				<input
					id={id ?? slugify(name)}
					type={type}
					className={css['input']}
					placeholder={placeholder}
					{...props}
				/>
			)}
		</div>
	);
}
