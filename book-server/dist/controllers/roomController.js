"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRooms = exports.createRoom = void 0;
const database_1 = require("../services/database");
const createRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, location, capacity } = req.body;
    try {
        const [existingRooms] = yield database_1.pool.query('SELECT id FROM rooms WHERE name = ?', [name]);
        if (existingRooms.length > 0) {
            res.status(400).json({ message: '❗Room already exists' });
            return;
        }
        yield database_1.pool.query('INSERT INTO rooms (name, location, capacity) VALUES (?, ?, ?)', [name, location, capacity]);
        res.status(201).json({ message: '✅ Room created successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.createRoom = createRoom;
const getRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rooms] = yield database_1.pool.query('SELECT * FROM rooms');
        res.json(rooms);
    }
    catch (error) {
        next(error);
    }
});
exports.getRooms = getRooms;
