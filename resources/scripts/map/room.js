export class Room {
	constructor(name, grid, doors = []) {
		this.name = name; // Room name	
		this.grid = grid; // Room grid
		this.doors = doors;	// Room doors
	}
	isWalkable(x, y) {
		if (x < 0 || x >= this.grid[0].length || y < 0 || y >= this.grid.length) {
			return false;
		}
		return this.grid[y][x] === 'empty';
	}
	addDoor(targetRoom, cost) {
		this.doors.push({ targetRoom, cost });
	}
}
