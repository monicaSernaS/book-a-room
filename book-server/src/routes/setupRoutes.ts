import { Router } from 'express';
import { setupRooms } from '../controllers/setupController';

const router = Router();

router.post('/', setupRooms);

export default router;
