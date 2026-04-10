import { Response } from 'express';
import { NotificationService } from '../services/NotificationService';
import { AuthRequest } from '../middleware/authMiddleware';

export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  getNotifications = (req: AuthRequest, res: Response): void => {
    const notifications = this.notificationService.getNotificationsForUser(req.userId!);
    res.json({ notifications: notifications.map(n => n.toJSON()) });
  };

  markAsRead = (req: AuthRequest, res: Response): void => {
    const success = this.notificationService.markAsRead(req.params.id as string);
    if (!success) { res.status(404).json({ error: 'Notification not found' }); return; }
    res.json({ message: 'Marked as read' });
  };
}
