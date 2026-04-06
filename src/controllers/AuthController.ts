import { Request, Response } from "express";
import { User } from "../models/User";
import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";

export class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const { userId, username, email, password } = req.body;
      const user = new User(userId, username, email, password);
      user.register();
      res.status(201).json({ message: "User registered" });
    } catch {
      res.status(400).json({ error: "Registration failed" });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body; // In real app, we'd search user by email.
      // Mock logic:
      const user = Array.from(UserService.getInstance().users.values()).find(u => u.getEmail() === email && u.getPasswordHash() === password);
      if (user) {
        const token = user.login();
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch {
      res.status(400).json({ error: "Login failed" });
    }
  }

  public static async logout(req: Request, res: Response): Promise<void> {
    try {
      const { userId, token } = req.body;
      const user = UserService.getInstance().getUser(userId);
      if (user) user.logout(token);
      res.status(200).json({ message: "Logout successful" });
    } catch {
      res.status(400).json({ error: "Logout failed" });
    }
  }
}
