import React, {useEffect, useState} from 'react';

// Tipi per TypeScript
type SelBonsType = {
	[key: string]: string[];
};

type BonusRow = {
	bonus: string;
	selBonus: string;
	value: string;
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
	const [types, setTypes] = useState<string[]>([]);
	const [slots, setSlots] = useState<string[]>([]);
	const [realms, setRealms] = useState<string[]>([]);
	const bonuses = ['Stat', 'Resist', 'Toa', 'Magic Skill', 'Melee Skill', 'Cap Bonus', 'Other'];
	const [selBons, setSelBons] = useState<SelBonsType>({});
	const [bonusRows, setBonusRows] = useState<BonusRow[]>([
		{bonus: '', selBonus: '', value: ''}
	]);

	useEffect(() => {
		const fetchTypes = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/itemType');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				const formattedTypes = data.map((item: { type: string }) => item.type);
				setTypes(formattedTypes);
				if (formattedTypes.length > 0) {
					setType(formattedTypes[0]); // Imposta il primo valore come default
				}
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
				if (formattedSlots.length > 0) {
					setSlot(formattedSlots[0]); // Imposta il primo valore come default
				}
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
				if (formattedRealms.length > 0) {
					setRealm(formattedRealms[0]); // Imposta il primo valore come default
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchRealms();
	}, []);

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

	useEffect(() => {
		const fetchMagicSkills = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/magic');
				if (response.ok) {
					const data: string[] = await response.json();
					setSelBons((prevSelBons) => ({
						...prevSelBons,
						'Magic Skill': data,
					}));
				} else {
					console.error('Errore nella risposta del servizio:', response.status);
				}
			} catch (error) {
				console.error('Errore nella chiamata API:', error);
			}
		};

		fetchMagicSkills();
	}, []);

	useEffect(() => {
		const fetchMeleeSkills = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/melee');
				if (response.ok) {
					const data: string[] = await response.json();
					setSelBons((prevSelBons) => ({
						...prevSelBons,
						'Melee Skill': data,
					}));
				} else {
					console.error('Errore nella risposta del servizio:', response.status);
				}
			} catch (error) {
				console.error('Errore nella chiamata API:', error);
			}
		};

		fetchMeleeSkills();
	}, []);

	useEffect(() => {
		const fetchCapBonuses = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/cap');
				if (response.ok) {
					const data: string[] = await response.json();
					setSelBons((prevSelBons) => ({
						...prevSelBons,
						'Cap Bonus': data,
					}));
				} else {
					console.error('Errore nella risposta del servizio:', response.status);
				}
			} catch (error) {
				console.error('Errore nella chiamata API:', error);
			}
		};

		fetchCapBonuses();
	}, []);

	useEffect(() => {
		const fetchOthers = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/other');
				if (response.ok) {
					const data: string[] = await response.json();
					setSelBons((prevSelBons) => ({
						...prevSelBons,
						'Other': data,
					}));
				} else {
					console.error('Errore nella risposta del servizio:', response.status);
				}
			} catch (error) {
				console.error('Errore nella chiamata API:', error);
			}
		};

		fetchOthers();
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const item = {
			name,
			type,
			slot,
			realm,
			tradeable,
			model,
			requiredLevel,
			bonusLevel,
			bonuses: bonusRows,
		};
		console.log('Item inserito:', item);
		resetForm();
	};

	const addBonusRow = () => {
		setBonusRows([...bonusRows, {bonus: '', selBonus: '', value: ''}]);
	};

	const removeBonusRow = (index: number) => {
		if (bonusRows.length > 1) {
			const newRows = bonusRows.filter((_, i) => i !== index);
			setBonusRows(newRows);
		}
	};

	const updateBonusRow = (index: number, field: keyof BonusRow, value: string) => {
		const newRows = bonusRows.map((row, i) => {
			if (i === index) {
				return {...row, [field]: value};
			}
			return row;
		});
		setBonusRows(newRows);
	};

	const resetForm = () => {
		setName('');
		setType(types.length > 0 ? types[0] : '');
		setSlot(slots.length > 0 ? slots[0] : '');
		setRealm(realms.length > 0 ? realms[0] : '');
		setTradeable('Yes');
		setModel('');
		setRequiredLevel('');
		setBonusLevel('');
		setBonusRows([{bonus: bonuses[0], selBonus: selBons[bonuses[0]][0], value: ''}]);
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

	const buttonStyleRemove: React.CSSProperties = {
		padding: '10px',
		marginTop: '18px',
		fontSize: '10px',
		backgroundColor: '#ad0303',
		color: 'white',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	};

	const buttonStyleRemoveDisabled: React.CSSProperties = {
		...buttonStyleRemove,
		backgroundColor: '#cccccc',
		cursor: 'not-allowed',
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
						placeholder="0"
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
						placeholder="1"
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
						placeholder="1"
						required
						min="1"
						max="50"
						style={inputStyle}
					/>
				</div>
			</div>

			<h3>Magical Bonuses</h3>
			{bonusRows.map((row, index) => (
				<div key={index} style={rowStyle}>
					<div style={columnStyle}>
						<label htmlFor={`bonus-${index}`}>Bonus</label>
						<select
							value={row.bonus}
							onChange={(e) => updateBonusRow(index, 'bonus', e.target.value)}
							style={inputStyle}
						>
							{bonuses.map((opt) => (
								<option key={opt} value={opt}>{opt}</option>
							))}
						</select>
					</div>
					<div style={columnStyle}>
						<label htmlFor={`selBonus-${index}`}>{row.bonus || "Select Bonus"}</label>
						<select
							value={row.selBonus}
							onChange={(e) => updateBonusRow(index, 'selBonus', e.target.value)}
							disabled={!row.bonus}
							style={inputStyle}
						>
							{row.bonus && selBons[row.bonus as keyof typeof selBons].map((opt) => (
								<option key={opt} value={opt}>{opt}</option>
							))}
						</select>
					</div>
					<div style={columnStyle}>
						<label htmlFor={`value-${index}`}>Value</label>
						<input
							type="number"
							value={row.value}
							onChange={(e) => updateBonusRow(index, 'value', e.target.value)}
							placeholder="0"
							required
							min="1"
							max="400"
							style={inputStyle}
						/>
					</div>
					<button
						type="button"
						onClick={() => removeBonusRow(index)}
						style={index === 0 ? buttonStyleRemoveDisabled : buttonStyleRemove}
						disabled={index === 0}
					>
						X
					</button>
				</div>
			))}

			<button type="button" onClick={addBonusRow} style={buttonStyleAdd}>
				+
			</button>
			<br/>
			<br/>
			<button type="submit" style={buttonStyle}>
				Insert Item
			</button>
			<button type="button" onClick={resetForm} style={buttonStyleClear}>
				Clear
			</button>
		</form>
	);
};

export default ComplexInsertObjectForm;
