import React, {useState} from 'react';
import * as styles from "@/styles/formStyles";
import {useSlots} from "@/hooks/useSlots";
import {useTypes} from "@/hooks/useTypes";
import {useRealms} from "@/hooks/useRealms";
import * as mapper from "@/components/DTOMapper";
import {BonusRow} from "@/components/types";
import {useBonuses} from "@/hooks/useBonuses";

const ComplexInsertObjectForm = () => {
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [slot, setSlot] = useState('');
	const [realm, setRealm] = useState('');
	const [tradeable, setTradeable] = useState('Yes');
	const [model, setModel] = useState('');
	const [requiredLevel, setRequiredLevel] = useState('');
	const [bonusLevel, setBonusLevel] = useState('');
	const bonuses = ['Stat', 'Resist', 'Toa', 'Magic Skill', 'Melee Skill', 'Cap Bonus', 'Other'];
	const [bonusRows, setBonusRows] = useState<BonusRow[]>([
		{bonus: bonuses[0], selBonus: '', value: ''}
	]);

	const slots = useSlots();
	const types = useTypes();
	const realms = useRealms();
	const selBons = useBonuses();

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
		console.log('Try to save this item:', itemDTO);

		fetch('http://localhost:8080/api/item', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(itemDTO),
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
				resetForm();
			})
			.catch(error => {
				alert(error);
				console.error('Error:', error);
			});
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
				if (field === 'bonus') {  // Se si aggiorna il campo 'bonus', aggiorna anche il 'selBonus'
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
		setModel('');
		setRequiredLevel('');
		setBonusLevel('');
		// Imposta selBonus come il primo valore della lista corrispondente a 'Stat'
		setBonusRows([{ bonus: bonuses[0], selBonus: selBons[bonuses[0]]?.[0] || '', value: '' }]);
	};

	return (
		<form onSubmit={handleSubmit} style={styles.formStyle}>
			<h3 style={styles.h3Style}>Item Details</h3>
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

			<h3 style={styles.h3Style}>Restrictions</h3>
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

			<h3 style={styles.h3Style}>Magical Bonuses</h3>
			{bonusRows.map((row, index) => (
				<div key={index} style={styles.rowStyle}>
					<div style={styles.columnStyle}>
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
