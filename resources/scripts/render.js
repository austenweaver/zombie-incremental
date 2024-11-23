// Import the renderMap function
export function renderMap(mapData) {
	const mapContainer = document.getElementById('map');
	mapContainer.innerHTML = ''; // Clear previous render

	// Render each room
	for (const roomName in mapData.rooms) {
		const room = mapData.rooms[roomName];

		// Create a room container
		const roomDiv = document.createElement('div');
		roomDiv.className = 'room';
		roomDiv.id = roomName;

		// Add cells to the room
		roomDiv.style.display = 'grid';
		roomDiv.style.gridTemplateRows = `repeat(${room.grid.length}, min-content)`;
		roomDiv.style.gridTemplateColumns = `repeat(${room.grid[0].reduce((acc, cell) => acc + (typeof cell === 'object' ? cell.count : 1), 0)}, min-content)`;
		roomDiv.style.gap = '2px'; // Set a fixed gap between cells
		room.grid.forEach(row => {
			row.forEach(cell => {
				const cellDiv = document.createElement('div');
				let cellType = typeof cell === 'string' ? cell : cell.type;
				cellDiv.className = `cell ${cellType.toLowerCase()}`; // Ensure class is in lowercase
				cellDiv.style.width = '50px'; // Set a fixed width for cells
				cellDiv.style.height = '50px'; // Set a fixed height for cells
				cellDiv.style.display = 'flex'; // Align content to center
				cellDiv.style.alignItems = 'center'; // Align content to center
				cellDiv.style.justifyContent = 'center'; // Align content to center
				if (cellType.toLowerCase() === 'wall' || cellType.toLowerCase() === 'door') {
					cellDiv.textContent = 'X'; // Add 'X' to unwalkable cells
				}
				let count = typeof cell === 'object' ? cell.count : 1;
				for (let i = 0; i < count; i++) {
					let clone = cellDiv.cloneNode();
					roomDiv.appendChild(clone);
				}
			});
		});

		// Append room to the map
		mapContainer.appendChild(roomDiv);
	}
}


// Fetch and render map1.json when the document loads
document.addEventListener('DOMContentLoaded', () => {
	fetch('../../maps/map1.json')
		.then(response => response.json())
		.then(mapData => {
			renderMap(mapData);
		})
		.catch(error => {
			console.error('Error loading map1.json:', error);
			});
});



