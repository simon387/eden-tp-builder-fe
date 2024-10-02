import {useEffect, useState} from 'react';

export const useSlots = () => {
	const [slots, setSlots] = useState<string[]>([]);

	useEffect(() => {
		const fetchSlots = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/slot');
				if (response.ok) {
					const data = await response.json();
					const formattedSlots = data.map((item: { slot: string }) => item.slot);
					setSlots(formattedSlots);
				} else {
					console.error('Network response was not ok', response.status);
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchSlots().then(() => {
		});
	}, []);

	return slots;
};