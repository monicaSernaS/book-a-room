import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../services/database';
import { generateToken } from '../services/jwtService';

export const register = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const [existingUsers]: any = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
      if (existingUsers.length > 0) {
        return res.status(400).json({ message: '❗Email already registered' });
      }

      await pool.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, hashedPassword]);
      return res.status(201).json({ message: '✅ User registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '❌ Server error during registration' });
    }
  })().catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    const { email, password } = req.body;
    try {
      const [users]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (users.length === 0) {
        return res.status(404).json({ message: '⚠️ User not found' });
      }

      const user = users[0];
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);

      if (!isPasswordValid) {
        return res.status(401).json({ message: '❗Invalid credentials' });
      }

      const token = generateToken({ id: user.id, email: user.email });
      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '❌Server error during login' });
    }
  })().catch(next);
};
