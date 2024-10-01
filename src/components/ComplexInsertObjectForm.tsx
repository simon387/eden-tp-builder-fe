import React, {useEffect, useState} from 'react';

const ComplexInsertObjectForm = () => {
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [slot, setSlot] = useState('');
	const [level, setLevel] = useState('');
	const [realm, setRealm] = useState('');
	const [tradeable, setTradeable] = useState('Yes');
	const [model, setModel] = useState('');
	const [requiredLevel, setRequiredLevel] = useState('');
	const [bonusLevel, setBonusLevel] = useState('');
	const [bonus, setBonus] = useState('');
	const [opzione1, setOpzione1] = useState('');
	const [opzione2, setOpzione2] = useState('');

	const [types, setTypes] = useState<string[]>([]);
	const [slots, setSlots] = useState<string[]>([]);
	const [realms, setRealms] = useState<string[]>([]);
	const bonuses = ['Stat', 'Resist', 'Other'];
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
		const fetchSlots = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/slot');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();

				const formattedSlots = data.map((item: { slot: string }) => item.slot);

				setSlots(formattedSlots);
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchSlots();
	}, []);

	useEffect(() => {
		const fetchRealms = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/realm');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();

				const formattedRealms = data.map((item: { name: string }) => item.name);

				setRealms(formattedRealms);
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchRealms();
	}, []);

	useEffect(() => {
		setOpzione2('');
	}, [opzione1]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const item = {
			name: name,
			livello: parseInt(level, 10),
			opzione1,
			opzione2,
		};
		console.log('Item inserito:', item);
		setName('');
		setLevel('');
		setOpzione1('');
		setOpzione2('');
	};

	const formStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		gap: '15px',
		maxWidth: '600px',
		margin: '0 auto',
	};

	const rowStyle: React.CSSProperties = {
		display: 'flex',
		gap: '15px',
	};

	const columnStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
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
			<h2>Item Details</h2>
			<div style={rowStyle}>
				<div style={columnStyle}>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
						required
						style={inputStyle}
					/>
				</div>
				<div style={columnStyle}>
					<label htmlFor="type">Type</label>
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
				</div>
			</div>

			<div style={rowStyle}>
				<div style={columnStyle}>
					<label htmlFor="slot">Slot</label>
					<select
						value={slot}
						onChange={(e) => setSlot(e.target.value)}
						style={inputStyle}
					>
						<option value="">Select Slot</option>
						{slots.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</div>
				<div style={columnStyle}>
					<label htmlFor="tradeable">Tradeable</label>
					<select
						value={tradeable}
						onChange={(e) => setTradeable(e.target.value)}
						style={inputStyle}
					>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
			</div>

			<div style={rowStyle}>
				<div style={columnStyle}>
					<label htmlFor="model">Model</label>
					<input
						type="number"
						value={model}
						onChange={(e) => setModel(e.target.value)}
						placeholder="Model"
						required
						min="1"
						max="9999"
						style={inputStyle}
					/>
				</div>
				<div style={columnStyle}></div>
			</div>

			<h2>Restrictions</h2>
			<div style={rowStyle}>
				<div style={columnStyle}>
					<label htmlFor="realm">Realm</label>
					<select
						value={realm}
						onChange={(e) => setRealm(e.target.value)}
						style={inputStyle}
					>
						<option value="">Select Realm</option>
						{realms.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</div>
				<div style={columnStyle}>
					<label htmlFor="requiredLevel">Required Level</label>
					<input
						type="number"
						value={requiredLevel}
						onChange={(e) => setRequiredLevel(e.target.value)}
						placeholder="Required Level"
						required
						min="1"
						max="50"
						style={inputStyle}
					/>
				</div>
				<div style={columnStyle}>
					<label htmlFor="bonusLevel">Bonus Level</label>
					<input
						type="number"
						value={bonusLevel}
						onChange={(e) => setBonusLevel(e.target.value)}
						placeholder="Bonus Level"
						required
						min="1"
						max="50"
						style={inputStyle}
					/>
				</div>
			</div>


			<h2>Magical Bonuses</h2>
			<div style={rowStyle}>
				<div style={columnStyle}>
					<label htmlFor="bonus">Bonus</label>
					<select
						value={bonus}
						onChange={(e) => setBonus(e.target.value)}
						style={inputStyle}
					>
						<option value="">Select Bonus</option>
						{bonuses.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</div>
			</div>

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
