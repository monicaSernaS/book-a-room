import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; 

interface JwtPayload {
  id: number;
  email: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.user = decoded; 
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
