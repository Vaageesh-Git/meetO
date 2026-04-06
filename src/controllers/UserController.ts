import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { NotificationService } from "../services/NotificationService";

export class UserController {
  public static async followUser(req: Request, res: Response): Promise<void> {
    try {
      const { followerId, followeeId } = req.body;
      const user = UserService.getInstance().getUser(followerId);
      if (user) {
        user.follow(followeeId);
        res.status(200).json({ message: "Followed successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch {
      res.status(400).json({ error: "Failed to follow user" });
    }
  }

  public static async getNotifications(req: Request, res: Response): Promise<void> {
     try {
       const { userId } = req.params;
       const notifications = NotificationService.getInstance().getNotifications(userId as string);
       res.status(200).json({ notifications });
     } catch {
       res.status(400).json({ error: "Failed to get notifications" });
     }
  }
}
