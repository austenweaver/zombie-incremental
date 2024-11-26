import { Room } from '../map/room';

describe('Room', () => {
    test('should create a room with a grid and portals', () => {
        const grid = [['empty', 'wall'], ['empty', 'empty']];
        const room = new Room('TestRoom', grid);

        expect(room.name).toBe('TestRoom');
        expect(room.grid).toEqual(grid);
        expect(room.portals).toEqual([]);
    });

    test('should correctly identify walkable spaces', () => {
        const grid = [['empty', 'wall'], ['empty', 'empty']];
        const room = new Room('TestRoom', grid);

        expect(room.isWalkable(0, 0)).toBe(true);  // Walkable
        expect(room.isWalkable(1, 0)).toBe(false); // Not walkable
        expect(room.isWalkable(2, 2)).toBe(false); // Out of bounds
    });

    test('should have correct GRID_VALUES', () => {
        expect(Room.GRID_VALUES.EMPTY).toBe('empty');
        expect(Room.GRID_VALUES.WALL).toBe('wall');
        expect(Room.GRID_VALUES.DOOR).toBe('door');
        expect(Room.GRID_VALUES.PORTAL).toBe('portal');
        expect(Room.GRID_VALUES.WINDOW).toBe('window');
    });

    test('should correctly identify walkable spaces with GRID_VALUES', () => {
        const grid = [
            [Room.GRID_VALUES.EMPTY, Room.GRID_VALUES.WALL],
            [Room.GRID_VALUES.DOOR, Room.GRID_VALUES.EMPTY],
            [Room.GRID_VALUES.WINDOW, Room.GRID_VALUES.PORTAL]
        ];
        const walkabilitySettings = {
            [Room.GRID_VALUES.EMPTY]: true,
            [Room.GRID_VALUES.WALL]: false,
            [Room.GRID_VALUES.DOOR]: false,
            [Room.GRID_VALUES.PORTAL]: false,
            [Room.GRID_VALUES.WINDOW]: false
        };
        const room = new Room('TestRoom', grid, walkabilitySettings);

        expect(room.isWalkable(0, 0)).toBe(true);  // Walkable (empty)
        expect(room.isWalkable(1, 0)).toBe(false); // Not walkable (wall)
        expect(room.isWalkable(0, 1)).toBe(false); // Not walkable (door)
        expect(room.isWalkable(1, 1)).toBe(true);  // Walkable (empty)
        expect(room.isWalkable(0, 2)).toBe(false); // Not walkable (Window)
        expect(room.isWalkable(1, 2)).toBe(false);  // Walkable (Portal)
    });

    test('should open and close portals correctly', () => {
        const grid = [['empty', 'wall'], ['empty', 'empty']];
        const room = new Room('TestRoom', grid);
        room.addPortal('Room2', 50, 'closed');

        expect(room.isPortalOpen('Room2')).toBe(false); // Portal should be closed initially

        room.openPortal('Room2');
        expect(room.isPortalOpen('Room2')).toBe(true); // Portal should be open

        room.closePortal('Room2');
        expect(room.isPortalOpen('Room2')).toBe(false); // Portal should be closed again
    });
});
