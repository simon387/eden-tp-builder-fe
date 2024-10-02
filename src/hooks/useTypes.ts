import {useEffect, useState} from 'react';

export const useTypes = () => {
	const [types, setTypes] = useState([]);

	useEffect(() => {
		const fetchTypes = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/itemType');
				if (response.ok) {
					const data = await response.json();
					const formattedTypes = data.map((item: { type: string }) => item.type);
					setTypes(formattedTypes);
				} else {
					console.error('Network response was not ok', response.status);
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchTypes().then(() => {
		});
	}, []);

	return types;
};