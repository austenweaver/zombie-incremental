import { Room } from '../map/room';

describe('Room', () => {
    test('should create a room with a grid and doors', () => {
        const grid = [['empty', 'wall'], ['empty', 'empty']];
        const room = new Room('TestRoom', grid);

        expect(room.name).toBe('TestRoom');
        expect(room.grid).toEqual(grid);
        expect(room.doors).toEqual([]);
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
    });

    test('should correctly identify walkable spaces with GRID_VALUES', () => {
        const grid = [
            [Room.GRID_VALUES.EMPTY, Room.GRID_VALUES.WALL],
            [Room.GRID_VALUES.DOOR, Room.GRID_VALUES.EMPTY]
        ];
        const room = new Room('TestRoom', grid);

        expect(room.isWalkable(0, 0)).toBe(true);  // Walkable (empty)
        expect(room.isWalkable(1, 0)).toBe(false); // Not walkable (wall)
        expect(room.isWalkable(0, 1)).toBe(false); // Not walkable (door)
        expect(room.isWalkable(1, 1)).toBe(true);  // Walkable (empty)
    });
});
