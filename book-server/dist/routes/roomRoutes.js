"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomController_1 = require("../controllers/roomController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Ruta pública: listar salas
router.get('/', roomController_1.getRooms);
// Ruta privada: crear sala
router.post('/', authMiddleware_1.verifyToken, roomController_1.createRoom);
exports.default = router;
