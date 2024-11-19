export class Room {
	constructor(name, grid, doors = []) {
		this.name = name; // Room name	
		this.grid = grid; // Room grid
		this.doors = doors;	// Room doors
	}
	isWalkable(x, y) {
		return this.grid[y][x] === 0;
	}
	addDoor(targetRoom, cost) {
		this.doors.push({ targetRoom, cost });
	}
}
