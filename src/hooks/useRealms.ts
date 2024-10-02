import {useEffect, useState} from 'react';

export const useRealms = () => {
	const [realms, setRealms] = useState<string[]>([]);

	useEffect(() => {
		const fetchRealms = async () => {
			try {
				const response = await fetch('http://localhost:8080/api/realm');
				if (response.ok) {
					const data = await response.json();
					const formattedRealms = data.map((item: { name: string }) => item.name);
					setRealms(formattedRealms);
				} else {
					console.error('Network response was not ok', response.status);
				}
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error);
			}
		};

		fetchRealms().then(() => {
		});
	}, []);

	return realms;
};