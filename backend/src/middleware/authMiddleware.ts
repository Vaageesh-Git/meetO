import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export interface AuthRequest extends Request {
  userId?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid authorization header' });
    return;
  }

  const token = header.slice(7);
  const userId = AuthService.getInstance().validateSession(token);
  if (!userId) {
    res.status(401).json({ error: 'Invalid or expired session' });
    return;
  }

  req.userId = userId;
  next();
}
