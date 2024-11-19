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
});
