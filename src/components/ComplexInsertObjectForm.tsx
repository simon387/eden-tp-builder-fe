import React, { useState, useEffect } from 'react';

const ComplexInsertObjectForm = () => {
	const [nome, setNome] = useState('');
	const [livello, setLivello] = useState('');
	const [opzione1, setOpzione1] = useState('');
	const [opzione2, setOpzione2] = useState('');

	const opzioni1 = ['Categoria A', 'Categoria B', 'Categoria C'];
	const opzioni2 = {
		'Categoria A': ['A1', 'A2', 'A3'],
		'Categoria B': ['B1', 'B2', 'B3'],
		'Categoria C': ['C1', 'C2', 'C3'],
	};

	useEffect(() => {
		setOpzione2('');
	}, [opzione1]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const oggetto = {
			nome,
			livello: parseInt(livello, 10),
			opzione1,
			opzione2,
		};
		console.log('Oggetto inserito:', oggetto);
		setNome('');
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
				value={nome}
				onChange={(e) => setNome(e.target.value)}
				placeholder="Nome"
				required
				style={inputStyle}
			/>
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
				Inserisci oggetto
			</button>
		</form>
	);
};

export default ComplexInsertObjectForm;