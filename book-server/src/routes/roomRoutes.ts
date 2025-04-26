import { Router } from 'express';
import { createRoom, getRooms } from '../controllers/roomController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// Ruta pública: listar salas
router.get('/', getRooms);

// Ruta privada: crear sala
router.post('/', verifyToken, createRoom);

export default router;
