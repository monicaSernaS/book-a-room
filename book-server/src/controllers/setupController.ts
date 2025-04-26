import { pool } from '../services/database';
import { Request, Response } from 'express';

export const setupRooms = async (req: Request, res: Response) => {
  try {
    await pool.query(`
      INSERT INTO rooms (name, description, capacity) VALUES
      ('Sala Tech', 'Sala moderna con pantalla 4K y pizarra digital.', 10),
      ('Espacio Creativo', 'Ideal para brainstorming y talleres.', 8),
      ('WorkHub', 'Sala de reuniones elegante y privada.', 12),
      ('Think Tank', 'Sala para sesiones intensivas de trabajo.', 6),
      ('Urban Space', 'Sala moderna en el centro de la ciudad.', 15),
      ('Focus Room', 'Espacio tranquilo para concentración máxima.', 4)
    `);

    res.status(201).json({ message: '✅ Salas creadas exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Error creando salas.' });
  }
};
