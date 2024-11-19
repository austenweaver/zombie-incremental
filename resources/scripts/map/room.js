export class Room {
    static GRID_VALUES = {
        EMPTY: 'empty',
        WALL: 'wall',
        DOOR: 'door',
        // Add more possible values as needed
    };

    constructor(name, grid, doors = []) {
        this.name = name; // Room name	
        this.grid = grid; // Room grid
        this.doors = doors;	// Room doors
    }

    isWalkable(x, y) {
        if (x < 0 || x >= this.grid[0].length || y < 0 || y >= this.grid.length) {
            return false;
        }
        return this.grid[y][x] === Room.GRID_VALUES.EMPTY;
    }

    addDoor(targetRoom, cost, status = 'closed') {
        this.doors.push({ targetRoom, cost, status });
    }

    openDoor(targetRoom) {
        const door = this.doors.find(door => door.targetRoom === targetRoom);
        if (door) {
            door.status = 'open';
        }
    }

    closeDoor(targetRoom) {
        const door = this.doors.find(door => door.targetRoom === targetRoom);
        if (door) {
            door.status = 'closed';
        }
    }

    isDoorOpen(targetRoom) {
        const door = this.doors.find(door => door.targetRoom === targetRoom);
        return door ? door.status === 'open' : false;
    }
}
