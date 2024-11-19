export class MapGraph {
	constructor() {
		this.rooms = {};
		this.connections = {};
	}

	addRoom(name, room) {
		if (!this.rooms[name]) {
			this.rooms[name] = room;
			this.connections[name] = [];
		}
	}

	connectRooms(room1Name, room2Name, doorCost = 0) {
		if (this.rooms[room1Name] && this.rooms[room2Name]) {
			this.connections[room1Name].push({ targetRoom: room2Name, cost: doorCost });
			this.connections[room2Name].push({ targetRoom: room1Name, cost: doorCost });
		}
		else {
			console.log("Error: connectRooms - Room not found");
		}
	}
	findPath(startRoomName, targetRoomName) {
		if (!this.rooms[startRoomName] || !this.rooms[targetRoomName]) {
			console.log("Error: findPath - Room not found");
			return [];
		}

		const distances = {};
		const previous = {};
		const queue = new Set(Object.keys(this.rooms));

		for (const roomName of queue) {
			distances[roomName] = Infinity;
			previous[roomName] = null;
		}
		distances[startRoomName] = 0;

		while (queue.size > 0) {
			// Find the room with the smallest distance
			const currentRoomName = [...queue].reduce((a, b) => distances[a] < distances[b] ? a : b);
			queue.delete(currentRoomName);

			// Stop if we reached the target room
			if (currentRoomName === targetRoomName) {
				const path = [];
				let step = targetRoomName;
				while (step) {
					path.unshift(step);
					step = previous[step];
				}
				return path;
			}

			// Update the distances
			for (const {room: neighbor, cost} of this.connections[currentRoomName]) {
				if (!queue.has(neighbor)) continue;
				const alt = distances[currentRoomName] + cost;
				if (alt < distances[neighbor]) {
					distances[neighbor] = alt;
					previous[neighbor] = currentRoomName;
				}
			}
		}
		return [];
	}
}