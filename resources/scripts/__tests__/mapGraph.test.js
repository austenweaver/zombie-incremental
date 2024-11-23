import { Room } from '../map/room';
import { MapGraph } from '../map/mapGraph'; // Corrected directory

describe('MapGraph', () => {
	test('should add rooms and connect them', () => {
		const room1 = new Room('Room1', [['empty']]);
		const room2 = new Room('Room2', [['empty']]);
	
		const graph = new MapGraph();
		graph.addRoom('Room1', room1);
		graph.addRoom('Room2', room2);
		graph.connectRooms('Room1', 'Room2', 50);
	
		// Check connections for Room1
		expect(graph.connections['Room1']).toEqual([{ room: 'Room2', cost: 50 }]);
	
		// Check connections for Room2
		expect(graph.connections['Room2']).toEqual([{ room: 'Room1', cost: 50 }]);
	});

	test('should find the shortest path between rooms', () => {
		const room1 = new Room('Room1', [['empty']]);
		const room2 = new Room('Room2', [['empty']]);
		const room3 = new Room('Room3', [['empty']]);
	
		const graph = new MapGraph();
		graph.addRoom('Room1', room1);
		graph.addRoom('Room2', room2);
		graph.addRoom('Room3', room3);
		graph.connectRooms('Room1', 'Room2', 10);
		graph.connectRooms('Room2', 'Room3', 20);
	
		const path = graph.findPath('Room1', 'Room3');
		expect(path).toEqual(['Room1', 'Room2', 'Room3']);
	});	
});
