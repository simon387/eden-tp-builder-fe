import React from 'react'
import ComplexInsertObjectForm from '../components/ComplexInsertObjectForm'

export default function Home() {
	return (
		<div style={{
			padding: '20px',
			maxWidth: '600px',
			margin: '0 auto',
			fontFamily: 'Arial, sans-serif'
		}}>
			<h1 style={{
				textAlign: 'center',
				marginBottom: '20px',
				color: '#333'
			}}>
				Inserimento Oggetto
			</h1>
			<ComplexInsertObjectForm />
		</div>
	)
}