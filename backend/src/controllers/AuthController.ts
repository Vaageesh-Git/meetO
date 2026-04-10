import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';

export class AuthController {
  constructor(private userService: UserService) {}

  register = (req: Request, res: Response): void => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        res.status(400).json({ error: 'username, email and password required' });
        return;
      }
      const { user, token } = this.userService.register(username, email, password);
      res.status(201).json({ user: user.toJSON(), token });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  login = (req: Request, res: Response): void => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'email and password required' });
        return;
      }
      const { user, token } = this.userService.login(email, password);
      res.json({ user: user.toJSON(), token });
    } catch (e: any) {
      res.status(401).json({ error: e.message });
    }
  };

  logout = (req: Request, res: Response): void => {
    const header = req.headers.authorization;
    if (header?.startsWith('Bearer ')) {
      AuthService.getInstance().invalidateSession(header.slice(7));
    }
    res.json({ message: 'Logged out' });
  };

  getMe = (req: any, res: Response): void => {
    const user = this.userService.getUserById(req.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ user: user.toJSON() });
  };
}
