"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservationController_1 = require("../controllers/reservationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Ruta pública: ver reservas
router.get('/', reservationController_1.getReservations);
// Ruta privada: crear reserva
router.post('/', authMiddleware_1.verifyToken, reservationController_1.createReservation);
exports.default = router;
