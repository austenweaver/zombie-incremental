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
		room.grid.forEach(row => {
			row.forEach(cell => {
				const cellDiv = document.createElement('div');
				let cellType = typeof cell === 'string' ? cell : cell.type;
				cellDiv.className = `cell ${cellType.toLowerCase()}`; // Ensure class is in lowercase
				console.log(cellType.toLowerCase())
				if (cellType.toLowerCase() === 'wall' || cellType.toLowerCase() === 'door' || cellType.toLowerCase() === 'portal') {
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


