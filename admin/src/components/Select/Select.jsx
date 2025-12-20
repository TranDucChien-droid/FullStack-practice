import { slugify } from '../../utils/utils';
import css from './Select.module.css';

export default function Select({ id, name, options, ...props }) {
	return (
		<div className={css['form-field-input']}>
			<span>{name}</span>
			<select id={id ?? slugify(name)} className={css['field']} {...props}>
				{options?.map((data, index) => {
					const id = 'select-' + index;
					return (
						<option key={id} value={JSON.stringify(data.value)}>
							{data.name}
						</option>
					);
				})}
			</select>
		</div>
	);
}
