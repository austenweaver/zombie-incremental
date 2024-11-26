export class Room {
    static GRID_VALUES = {
        EMPTY: 'empty',
        WALL: 'wall',
        DOOR: 'door',
        PORTAL: 'portal',
        WINDOW: 'window'
        // Add more possible values as needed
    };

    constructor(name, grid, portals = []) {
        this.name = name; // Room name	
        this.grid = grid; // Room grid
        this.portals = portals;	// Room portals
    }

    isWalkable(x, y) {
        if (x < 0 || x >= this.grid[0].length || y < 0 || y >= this.grid.length) {
            return false;
        }
        const cell = this.grid[y][x];
        return cell === Room.GRID_VALUES.EMPTY;
    }

    addPortal(targetRoom, cost, status = 'closed') {
        this.portals.push({ targetRoom, cost, status });
    }

    openPortal(targetRoom) {
        const portal = this.portals.find(portal => portal.targetRoom === targetRoom);
        if (portal) {
            portal.status = 'open';
        }
    }

    closePortal(targetRoom) {
        const portal = this.portals.find(portal => portal.targetRoom === targetRoom);
        if (portal) {
            portal.status = 'closed';
        }
    }

    isPortalOpen(targetRoom) {
        const portal = this.portals.find(portal => portal.targetRoom === targetRoom);
        return portal ? portal.status === 'open' : false;
    }
}
