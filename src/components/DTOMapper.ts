import {BonusRow} from "@/components/types";

export function convertStatRowsToStatDTO(statRows: BonusRow[]) {
	return statRows
		.filter((row) => row.bonus === "Stat") // Filtra solo le righe con bonus "Stat"
		.map((row) => ({
			stat: row.selBonus, // Campo corrispondente in Java
			value: parseInt(row.value), // Conversione a intero
		}));
}

export function convertBonusRowsToCapBonusDTO(statRows: BonusRow[]) {
	return statRows
		.filter((row) => row.bonus === "Cap Bonus")
		.map((row) => ({
			capBonus: row.selBonus, // Campo corrispondente in Java
			value: parseInt(row.value), // Conversione a intero
		}));
}

export function convertBonusRowsToToasDTO(statRows: BonusRow[]) {
	return statRows
		.filter((row) => row.bonus === "Toa")
		.map((row) => ({
			toa: row.selBonus, // Campo corrispondente in Java
			value: parseInt(row.value), // Conversione a intero
		}));
}

export function convertBonusRowsToMeleesDTO(statRows: BonusRow[]) {
	return statRows
		.filter((row) => row.bonus === "Melee Skill")
		.map((row) => ({
			melee: row.selBonus, // Campo corrispondente in Java
			value: parseInt(row.value), // Conversione a intero
		}));
}

export function convertBonusRowsToMagicsDTO(statRows: BonusRow[]) {
	return statRows
		.filter((row) => row.bonus === "Magic Skill")
		.map((row) => ({
			magic: row.selBonus, // Campo corrispondente in Java
			value: parseInt(row.value), // Conversione a intero
		}));
}

export function convertBonusRowsToResistsDTO(statRows: BonusRow[]) {
	return statRows
		.filter((row) => row.bonus === "Resist")
		.map((row) => ({
			resist: row.selBonus, // Campo corrispondente in Java
			value: parseInt(row.value), // Conversione a intero
		}));
}

export function convertBonusRowsToOthersDTO(statRows: BonusRow[]) {
	return statRows
		.filter((row) => row.bonus === "Other")
		.map((row) => ({
			other: row.selBonus, // Campo corrispondente in Java
			value: parseInt(row.value), // Conversione a intero
		}));
}
