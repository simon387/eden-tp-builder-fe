import React from 'react';

export const formStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '15px',
	maxWidth: '600px',
	margin: '0 auto',
};

export const rowStyle: React.CSSProperties = {
	display: 'flex',
	gap: '15px',
};

export const columnStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
};

export const inputStyle: React.CSSProperties = {
	padding: '8px',
	fontSize: '16px',
	border: '1px solid #ccc',
	borderRadius: '4px',
};

export const buttonStyle: React.CSSProperties = {
	padding: '10px',
	fontSize: '16px',
	backgroundColor: '#4CAF50',
	color: 'white',
	border: 'none',
	borderRadius: '4px',
	cursor: 'pointer',
};

export const buttonStyleClear: React.CSSProperties = {
	padding: '10px',
	fontSize: '16px',
	backgroundColor: '#ad0303',
	color: 'white',
	border: 'none',
	borderRadius: '4px',
	cursor: 'pointer',
};

export const buttonStyleAdd: React.CSSProperties = {
	padding: '10px',
	fontSize: '16px',
	backgroundColor: '#030bad',
	color: 'white',
	border: 'none',
	borderRadius: '4px',
	cursor: 'pointer',
};

export const buttonStyleRemove: React.CSSProperties = {
	padding: '10px',
	marginTop: '18px',
	fontSize: '10px',
	backgroundColor: '#ad0303',
	color: 'white',
	border: 'none',
	borderRadius: '4px',
	cursor: 'pointer',
};

export const buttonStyleRemoveDisabled: React.CSSProperties = {
	...buttonStyleRemove,
	backgroundColor: '#cccccc',
	cursor: 'not-allowed',
};

export const h3Style: React.CSSProperties = {
	margin: '10px 0 0 0',
}
