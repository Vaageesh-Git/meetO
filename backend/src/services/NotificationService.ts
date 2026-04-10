import { Notification, NotificationType } from '../models/Notification';

// Observer pattern — receives events from LikeService, CommentService, FollowService
export class NotificationService {
  private notifications: Map<string, Notification> = new Map();

  sendNotification(userId: string, actorId: string, type: NotificationType, targetId: string): Notification {
    const notification = new Notification(userId, actorId, type, targetId);
    this.notifications.set(notification.getId(), notification);
    return notification;
  }

  getNotificationsForUser(userId: string): Notification[] {
    return Array.from(this.notifications.values())
      .filter(n => n.getUserId() === userId)
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime());
  }

  markAsRead(notificationId: string): boolean {
    const notification = this.notifications.get(notificationId);
    if (!notification) return false;
    notification.markAsRead();
    return true;
  }
}
