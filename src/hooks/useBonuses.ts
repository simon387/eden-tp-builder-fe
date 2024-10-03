import { useState, useEffect } from 'react';
import {SelBonsType} from "@/components/types";

export const useBonuses = () => {
	const [selBons, setSelBons] = useState<SelBonsType>({});

	useEffect(() => {
		const fetchBonusesData = async () => {
			const endpoints = [
				{ key: 'Stat', url: 'http://localhost:8080/api/stat' },
				{ key: 'Resist', url: 'http://localhost:8080/api/resist' },
				{ key: 'Toa', url: 'http://localhost:8080/api/toa' },
				{ key: 'Magic Skill', url: 'http://localhost:8080/api/magic' },
				{ key: 'Melee Skill', url: 'http://localhost:8080/api/melee' },
				{ key: 'Cap Bonus', url: 'http://localhost:8080/api/cap' },
				{ key: 'Other', url: 'http://localhost:8080/api/other' }
			];

			for (const endpoint of endpoints) {
				try {
					const response = await fetch(endpoint.url);
					if (response.ok) {
						const data: string[] = await response.json();
						setSelBons(prev => ({ ...prev, [endpoint.key]: data }));
					} else {
						console.error(`Network response was not ok for ${endpoint.key}`, response.status);
					}
				} catch (error) {
					console.error(`There was a problem fetching ${endpoint.key}:`, error);
				}
			}
		};

		fetchBonusesData().then(() => {});
	}, []);

	return  selBons ;
};