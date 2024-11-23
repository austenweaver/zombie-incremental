import fs from 'fs';
import path from 'path';
import { Room } from './room';

export class MapGraph {
    constructor() {
        this.rooms = {};
        this.connections = {};
    }

    addRoom(name, room) {
        this.rooms[name] = room;
        this.connections[name] = [];
    }

    connectRooms(room1, room2, cost) {
        this.connections[room1].push({ room: room2, cost });
        this.connections[room2].push({ room: room1, cost });
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
            const currentRoomName = [...queue].reduce((a, b) => distances[a] < distances[b] ? a : b);
            queue.delete(currentRoomName);
    
            if (currentRoomName === targetRoomName) {
                const path = [];
                let step = targetRoomName;
                while (step) {
                    path.unshift(step);
                    step = previous[step];
                }
                return path;
            }
    
            for (const { room: neighbor, cost } of this.connections[currentRoomName]) {
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

    loadMap(mapFilePath) {
        const mapData = JSON.parse(fs.readFileSync(mapFilePath, 'utf8'));
        const gridValues = mapData.GRID_VALUES;

        mapData.rooms.forEach(roomData => {
            const grid = roomData.grid.map(row => {
                return row.flatMap(cell => {
                    if (typeof cell === 'object' && cell.type && cell.count) {
                        return Array(cell.count).fill(gridValues[cell.type]);
                    }
                    return gridValues[cell];
                });
            });
            const room = new Room(roomData.name, grid, roomData.doors);
            this.addRoom(roomData.name, room);
        });
        mapData.rooms.forEach(roomData => {
            roomData.doors.forEach(door => {
                this.connectRooms(roomData.name, door.targetRoom, door.cost);
            });
        });
    }
}
