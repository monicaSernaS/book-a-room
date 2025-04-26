import { Request, Response, NextFunction } from 'express';
import { pool } from '../services/database';

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  const { name, location, capacity } = req.body;

  try {
    const [existingRooms]: any = await pool.query('SELECT id FROM rooms WHERE name = ?', [name]);
    if (existingRooms.length > 0) {
      res.status(400).json({ message: '❗Room already exists' });
      return;
    }

    await pool.query('INSERT INTO rooms (name, location, capacity) VALUES (?, ?, ?)', [name, location, capacity]);
    res.status(201).json({ message: '✅ Room created successfully' });
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rooms]: any = await pool.query('SELECT * FROM rooms');
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};
