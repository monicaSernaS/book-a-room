import { Request, Response } from 'express';
import { pool } from '../services/database';

export const createReservation = async (req: any, res: Response) => {
  const { room_id, date, time_slot } = req.body;
  const user = req.user;

  if (!user) {
    res.status(401).json({ message: '❌ Unauthorized' });
    return;
  }

  try {
    const [existingReservations]: any = await pool.query(
      'SELECT * FROM reservations WHERE room_id = ? AND date = ? AND time_slot = ?',
      [room_id, date, time_slot]
    );

    if (existingReservations.length > 0) {
      res.status(400).json({ message: '❗Room already reserved at this time' });
      return;
    }

    await pool.query(
      'INSERT INTO reservations (user_id, room_id, date, time_slot) VALUES (?, ?, ?, ?)',
      [user.id, room_id, date, time_slot]
    );

    res.status(201).json({ message: '✅Reservation created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Server error while creating reservation 🤷🏻‍♀️' });
  }
};

export const getReservations = async (req: any, res: Response) => {
  try {
    const [reservations]: any = await pool.query(
      `SELECT r.id, r.date, r.time_slot, u.name as user_name, rm.name as room_name
       FROM reservations r
       JOIN users u ON r.user_id = u.id
       JOIN rooms rm ON r.room_id = rm.id`
    );

    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Server error while fetching reservations' });
  }
};
