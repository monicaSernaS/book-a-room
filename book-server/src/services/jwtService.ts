import jwt from 'jsonwebtoken';

const SECRET_KEY = 'key_safe_and_secret'; 

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, SECRET_KEY);
}
