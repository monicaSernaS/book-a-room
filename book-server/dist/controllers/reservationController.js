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
exports.getReservations = exports.createReservation = void 0;
const database_1 = require("../services/database");
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { room_id, date, time_slot } = req.body;
    const user = req.user;
    if (!user) {
        res.status(401).json({ message: '❌ Unauthorized' });
        return;
    }
    try {
        const [existingReservations] = yield database_1.pool.query('SELECT * FROM reservations WHERE room_id = ? AND date = ? AND time_slot = ?', [room_id, date, time_slot]);
        if (existingReservations.length > 0) {
            res.status(400).json({ message: '❗Room already reserved at this time' });
            return;
        }
        yield database_1.pool.query('INSERT INTO reservations (user_id, room_id, date, time_slot) VALUES (?, ?, ?, ?)', [user.id, room_id, date, time_slot]);
        res.status(201).json({ message: '✅Reservation created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: '❌ Server error while creating reservation 🤷🏻‍♀️' });
    }
});
exports.createReservation = createReservation;
const getReservations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [reservations] = yield database_1.pool.query(`SELECT r.id, r.date, r.time_slot, u.name as user_name, rm.name as room_name
       FROM reservations r
       JOIN users u ON r.user_id = u.id
       JOIN rooms rm ON r.room_id = rm.id`);
        res.json(reservations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: '❌ Server error while fetching reservations' });
    }
});
exports.getReservations = getReservations;
