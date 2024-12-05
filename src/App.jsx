import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	let isValueValid = value.length > 2 ? true : false;

	const onInputButtonClick = () => {
		let promptValue = prompt('Введите значение');
		
		if (promptValue === null) return;
		if (promptValue.length > 2) {
			setValue(promptValue);
			setError('');
		} else {
			setError('Введенное значение должно содержать минимум 3 символа');
		}
	};

	const onAddButtonClick = () => {
		if (value.length > 2) {
			let id = Date.now();
			const options1 = {year: 'numeric', month: '2-digit', day: '2-digit'};
			const options2 = {hour: '2-digit', minute: '2-digit', hour12: false, second: '2-digit'};
			const date = new Intl.DateTimeFormat('ru-RU', options1).format(new Date());
			const time = new Intl.DateTimeFormat('ru-RU', options2).format(new Date());
			setList((updatedList) => [...updatedList, { id, value, date, time }]);
			setValue('');
			setError('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length < 1 && (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
				<ul className={styles.list}>
					{list.length > 0 &&
						list.map(({ id, value, date, time }) => (
							<li className={styles['list-item']} key={id}>
								{value}, <br/>создано: {date} {time};
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};
