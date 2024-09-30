import React, {useEffect, useState} from 'react';

const ComplexInsertObjectForm = () => {
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [livello, setLivello] = useState('');
	const [opzione1, setOpzione1] = useState('');
	const [opzione2, setOpzione2] = useState('');

	const [types, setTypes] = useState<string[]>([]);
	const opzioni1 = ['Categoria A', 'Categoria B', 'Categoria C'];
	const opzioni2 = {
		'Categoria A': ['A1', 'A2', 'A3'],
		'Categoria B': ['B1', 'B2', 'B3'],
		'Categoria C': ['C1', 'C2', 'C3'],
	};

	useEffect(() => {
		const fetchTypes = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/itemType');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();

				// Estraiamo solo i valori 'type' mantenendo la capitalizzazione originale
				const formattedTypes = data.map((item: { type: string }) => item.type);

				setTypes(formattedTypes);
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchTypes();
	}, []);

	useEffect(() => {
		setOpzione2('');
	}, [opzione1]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const item = {
			name: name,
			livello: parseInt(livello, 10),
			opzione1,
			opzione2,
		};
		console.log('Item inserito:', item);
		setName('');
		setLivello('');
		setOpzione1('');
		setOpzione2('');
	};

	const formStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		gap: '15px',
	};

	const inputStyle: React.CSSProperties = {
		padding: '8px',
		fontSize: '16px',
		border: '1px solid #ccc',
		borderRadius: '4px',
	};

	const buttonStyle: React.CSSProperties = {
		padding: '10px',
		fontSize: '16px',
		backgroundColor: '#4CAF50',
		color: 'white',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	};

	return (
		<form onSubmit={handleSubmit} style={formStyle}>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Name"
				required
				style={inputStyle}
			/>
			<select
				value={type}
				onChange={(e) => setType(e.target.value)}
				style={inputStyle}
			>
				<option value="">Select Type</option>
				{types.map((opt) => (
					<option key={opt} value={opt}>{opt}</option>
				))}
			</select>
			<input
				type="number"
				value={livello}
				onChange={(e) => setLivello(e.target.value)}
				placeholder="Livello"
				required
				min="0"
				style={inputStyle}
			/>
			<select
				value={opzione1}
				onChange={(e) => setOpzione1(e.target.value)}
				style={inputStyle}
			>
				<option value="">Seleziona Opzione 1</option>
				{opzioni1.map((opt) => (
					<option key={opt} value={opt}>{opt}</option>
				))}
			</select>
			<select
				value={opzione2}
				onChange={(e) => setOpzione2(e.target.value)}
				disabled={!opzione1}
				style={inputStyle}
			>
				<option value="">Seleziona Opzione 2</option>
				{opzione1 && opzioni2[opzione1 as keyof typeof opzioni2].map((opt) => (
					<option key={opt} value={opt}>{opt}</option>
				))}
			</select>
			<button type="submit" style={buttonStyle}>
				Insert Item
			</button>
		</form>
	);
};

export default ComplexInsertObjectForm;
