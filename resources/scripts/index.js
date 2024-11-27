import { renderMap } from './render.js';

// Fetch and render map1.json when the document loads
document.addEventListener('DOMContentLoaded', () => {
	const baseUrl = window.location.hostname === '127.0.0.1' ? '' : '/zombie-incremental';
	fetch(`${baseUrl}/maps/map1.json`)
		.then(response => response.json())
		.then(mapData => {
			renderMap(mapData);
		})
		.catch(error => {
			console.error('Error loading map1.json:', error);
			});
});



