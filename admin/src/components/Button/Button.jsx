import css from './Button.module.css';

export default function Button({ children, type = 'button', ...props }) {
	return (
		<div className={css['form-field-input']}>
			<button className={css['field']} type={type} {...props}>
				{children}
			</button>
		</div>
	);
}
