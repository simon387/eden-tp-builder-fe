import React, {useEffect, useState} from 'react';
import * as styles from "@/styles/formStyles";
import {useSlots} from "@/hooks/useSlots";
import {useTypes} from "@/hooks/useTypes";
import {useRealms} from "@/hooks/useRealms";
import * as mapper from "@/components/DTOMapper";
import {BonusRow, SelBonsType} from "@/components/types";

const ComplexInsertObjectForm = () => {
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [slot, setSlot] = useState('');
	const [realm, setRealm] = useState('');
	const [tradeable, setTradeable] = useState('Yes');
	const [model, setModel] = useState('1000');
	const [requiredLevel, setRequiredLevel] = useState('50');
	const [bonusLevel, setBonusLevel] = useState('50');
	const bonuses = ['Stat', 'Resist', 'Toa', 'Magic Skill', 'Melee Skill', 'Cap Bonus', 'Other'];
	const [selBons, setSelBons] = useState<SelBonsType>({});
	const [bonusRows, setBonusRows] = useState<BonusRow[]>([
		{bonus: bonuses[0], selBonus: '', value: ''}
	]);

	const slots = useSlots();
	const types = useTypes();
	const realms = useRealms();

	useEffect(() => {
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
					console.error('Network response was not ok', response.status);
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchStat().then(() => {
		});
	}, []);

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
					console.error('Network response was not ok', response.status);
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchResist().then(() => {
		});
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
					console.error('Network response was not ok', response.status);
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchToAs().then(() => {
		});
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
					console.error('Network response was not ok', response.status);
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchMagicSkills().then(() => {
		});
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
					console.error('Network response was not ok', response.status);
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchMeleeSkills().then(() => {
		});
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
					console.error('Network response was not ok', response.status);
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchCapBonuses().then(() => {
		});
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
					console.error('Network response was not ok', response.status);
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchOthers().then(() => {
		});
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const itemDTO = {
			name: name,
			type: type,
			slot: slot,
			realm: realm,
			requiredLevel: parseInt(requiredLevel),
			bonusLevel: parseInt(bonusLevel),
			model: parseInt(model),
			tradeable: tradeable === 'Yes',
			utility: 0,
			level: 0,
			stats: mapper.convertStatRowsToStatDTO(bonusRows),
			capBonuses: mapper.convertBonusRowsToCapBonusDTO(bonusRows),
			toas: mapper.convertBonusRowsToToasDTO(bonusRows),
			melees: mapper.convertBonusRowsToMeleesDTO(bonusRows),
			magics: mapper.convertBonusRowsToMagicsDTO(bonusRows),
			resists: mapper.convertBonusRowsToResistsDTO(bonusRows),
			others: mapper.convertBonusRowsToOthersDTO(bonusRows),
		};
		console.log('Item conv:', itemDTO);

		// resetForm();
	};

	const addBonusRow = () => {
		const firstBonus = bonuses[0];
		setBonusRows([
			...bonusRows,
			{ bonus: firstBonus, selBonus: selBons[firstBonus]?.[0] || '', value: '' }
		]);
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
				const updatedRow = { ...row, [field]: value };
				// Se si aggiorna il campo 'bonus', aggiorna anche il 'selBonus'
				if (field === 'bonus') {
					updatedRow.selBonus = selBons[value]?.[0] || '';  // Imposta il primo valore disponibile
				}
				return updatedRow;
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
		setModel('1000');
		setRequiredLevel('50');
		setBonusLevel('50');
		// Imposta selBonus come il primo valore della lista corrispondente a 'Stat'
		setBonusRows([{ bonus: bonuses[0], selBonus: selBons[bonuses[0]]?.[0] || '', value: '' }]);
	};

	return (
		<form onSubmit={handleSubmit} style={styles.formStyle}>
			<h3>Item Details</h3>
			<div style={styles.rowStyle}>
				<div style={styles.columnStyle}>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
						required
						style={styles.inputStyle}
					/>
				</div>
				<div style={styles.columnStyle}>
					<label htmlFor="type">Type</label>
					<select
						value={type}
						onChange={(e) => setType(e.target.value)}
						style={styles.inputStyle}
					>
						{types.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</div>
			</div>

			<div style={styles.rowStyle}>
				<div style={styles.columnStyle}>
					<label htmlFor="slot">Slot</label>
					<select
						value={slot}
						onChange={(e) => setSlot(e.target.value)}
						style={styles.inputStyle}
					>
						{slots.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</div>
				<div style={styles.columnStyle}>
					<label htmlFor="tradeable">Tradeable</label>
					<select
						value={tradeable}
						onChange={(e) => setTradeable(e.target.value)}
						style={styles.inputStyle}
					>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<div style={styles.columnStyle}>
					<label htmlFor="model">Model</label>
					<input
						type="number"
						value={model}
						onChange={(e) => setModel(e.target.value)}
						placeholder="0"
						required
						min="1"
						max="9999"
						style={styles.inputStyle}
					/>
				</div>
			</div>

			<h3>Restrictions</h3>
			<div style={styles.rowStyle}>
				<div style={styles.columnStyle}>
					<label htmlFor="realm">Realm</label>
					<select
						value={realm}
						onChange={(e) => setRealm(e.target.value)}
						style={styles.inputStyle}
					>
						{realms.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</div>
				<div style={styles.columnStyle}>
					<label htmlFor="requiredLevel">Required Level</label>
					<input
						type="number"
						value={requiredLevel}
						onChange={(e) => setRequiredLevel(e.target.value)}
						placeholder="1"
						required
						min="1"
						max="50"
						style={styles.inputStyle}
					/>
				</div>
				<div style={styles.columnStyle}>
					<label htmlFor="bonusLevel">Bonus Level</label>
					<input
						type="number"
						value={bonusLevel}
						onChange={(e) => setBonusLevel(e.target.value)}
						placeholder="1"
						required
						min="1"
						max="50"
						style={styles.inputStyle}
					/>
				</div>
			</div>

			<h3>Magical Bonuses</h3>
			{bonusRows.map((row, index) => (
				<div key={index} style={styles.rowStyle}>
					<div style={styles.columnStyle}>
						<label htmlFor={`bonus-${index}`}>Bonus</label>
						<select
							value={row.bonus}
							onChange={(e) => updateBonusRow(index, 'bonus', e.target.value)}
							style={styles.inputStyle}
						>
							{bonuses.map((opt) => (
								<option key={opt} value={opt}>{opt}</option>
							))}
						</select>
					</div>
					<div style={styles.columnStyle}>
						<label htmlFor={`selBonus-${index}`}>{row.bonus || "Select Bonus"}</label>
						<select
							value={row.selBonus}
							onChange={(e) => updateBonusRow(index, 'selBonus', e.target.value)}
							disabled={!row.bonus || !selBons[row.bonus]}
							style={styles.inputStyle}
						>
							{row.bonus && selBons[row.bonus] && selBons[row.bonus].map((opt) => (
								<option key={opt} value={opt}>{opt}</option>
							))}
						</select>
					</div>
					<div style={styles.columnStyle}>
						<label htmlFor={`value-${index}`}>Value</label>
						<input
							type="number"
							value={row.value}
							onChange={(e) => updateBonusRow(index, 'value', e.target.value)}
							placeholder="0"
							required
							min="1"
							max="400"
							style={styles.inputStyle}
						/>
					</div>
					<button
						type="button"
						onClick={() => removeBonusRow(index)}
						style={index === 0 ? styles.buttonStyleRemoveDisabled : styles.buttonStyleRemove}
						disabled={index === 0}
					>
						Remove
					</button>
				</div>
			))}

			<button type="button" onClick={addBonusRow} style={styles.buttonStyleAdd}>
				+
			</button>
			<br/>
			<br/>
			<button type="submit" style={styles.buttonStyle}>
				Insert Item
			</button>
			<button type="button" onClick={resetForm} style={styles.buttonStyleClear}>
				Clear
			</button>
		</form>
	);
};

export default ComplexInsertObjectForm;
