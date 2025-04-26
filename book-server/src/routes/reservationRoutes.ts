import { Router } from 'express';
import { createReservation, getReservations } from '../controllers/reservationController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// Ruta pública: ver reservas
router.get('/', getReservations);

// Ruta privada: crear reserva
router.post('/', verifyToken, createReservation);

export default router;
