import React, {useEffect, useState} from 'react';

// Tipi per TypeScript
type SelBonsType = {
	[key: string]: string[];
};

const ComplexInsertObjectForm = () => {
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [slot, setSlot] = useState('');
	const [realm, setRealm] = useState('');
	const [tradeable, setTradeable] = useState('Yes');
	const [model, setModel] = useState('');
	const [requiredLevel, setRequiredLevel] = useState('');
	const [bonusLevel, setBonusLevel] = useState('');
	const [bonus, setBonus] = useState('');
	const [selBonus, setSelBonus] = useState('');
	const [types, setTypes] = useState<string[]>([]);
	const [slots, setSlots] = useState<string[]>([]);
	const [realms, setRealms] = useState<string[]>([]);
	const bonuses = ['Stat', 'Resist', 'Toa', 'Magic Skill', 'Melee Skill', 'Cap Bonus', 'Other'];
	const [selBons, setSelBons] = useState<SelBonsType>({
		'Magic Skill': ['m1', 'm2', 'm3'],
		'Melee Skill': ['l1', 'l2', 'l3'],
		'Cap Bonus': ['c1', 'c2', 'c3'],
		'Other': ['o1', 'o2', 'o3'],
	});
	const [value, setValue] = useState('');

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
		setSelBonus('');
	}, [bonus]);

	// Effettua la chiamata API e aggiorna lo stato
	useEffect(() => {
		// Funzione per chiamare il servizio REST
		const fetchStat = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/stat');
				if (response.ok) {
					const data: string[] = await response.json();
					// Aggiorna solo la chiave 'Stat' del tuo stato
					setSelBons((prevSelBons) => ({
						...prevSelBons,
						Stat: data, // Rimpiazza 'Stat' con i dati dall'API
					}));
				} else {
					console.error('Errore nella risposta del servizio:', response.status);
				}
			} catch (error) {
				console.error('Errore nella chiamata API:', error);
			}
		};

		// Chiamata all'API
		fetchStat();
	}, []); // Esegui solo al montaggio del componente

	useEffect(() => {
		const fetchResist = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/resist');
				if (response.ok) {
					const data: string[] = await response.json();
					setSelBons((prevSelBons) => ({
						...prevSelBons,
						Resist: data,
					}));
				} else {
					console.error('Errore nella risposta del servizio:', response.status);
				}
			} catch (error) {
				console.error('Errore nella chiamata API:', error);
			}
		};

		fetchResist();
	}, []);

	useEffect(() => {
		const fetchToAs = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/toa');
				if (response.ok) {
					const data: string[] = await response.json();
					setSelBons((prevSelBons) => ({
						...prevSelBons,
						Toa: data,
					}));
				} else {
					console.error('Errore nella risposta del servizio:', response.status);
				}
			} catch (error) {
				console.error('Errore nella chiamata API:', error);
			}
		};

		fetchToAs();
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const item = {
			name: name,
			// livello: parseInt(level, 10),

		};
		console.log('Item inserito:', item);
		setName('');
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

	const buttonStyleClear: React.CSSProperties = {
		padding: '10px',
		fontSize: '16px',
		backgroundColor: '#ad0303',
		color: 'white',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	};

	const buttonStyleAdd: React.CSSProperties = {
		padding: '10px',
		fontSize: '16px',
		backgroundColor: '#030bad',
		color: 'white',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	};

	return (
		<form onSubmit={handleSubmit} style={formStyle}>
			<h3>Item Details</h3>
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
			</div>

			<h3>Restrictions</h3>
			<div style={rowStyle}>
				<div style={columnStyle}>
					<label htmlFor="realm">Realm</label>
					<select
						value={realm}
						onChange={(e) => setRealm(e.target.value)}
						style={inputStyle}
					>
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


			<h3>Magical Bonuses</h3>
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
				<div style={columnStyle}>
					<label htmlFor="selBons">{bonus || "Select Bonus"}</label>
					<select
						value={selBonus}
						onChange={(e) => setSelBonus(e.target.value)}
						disabled={!bonus}
						style={inputStyle}
					>
						{bonus && selBons[bonus as keyof typeof selBons].map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</div>
				<div style={columnStyle}>
					<label htmlFor="value">Value</label>
					<input
						type="number"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Value"
						required
						min="1"
						max="400"
						style={inputStyle}
					/>
				</div>
			</div>

			<button type="button" style={buttonStyleAdd}>
				+
			</button>
			<br/>
			<br/>
			<button type="submit" style={buttonStyle}>
				Insert Item
			</button>
			<button type="button" style={buttonStyleClear}>
				Clear
			</button>
		</form>
	);
};

export default ComplexInsertObjectForm;
