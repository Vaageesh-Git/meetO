import { IObserver } from "../patterns/Observer";
import { Notification } from "../models/Notification";

export class NotificationService implements IObserver {
  private static instance: NotificationService;
  private notifications: Notification[] = [];

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Implementing IObserver update method
  public update(actionType: string, payload: any): void {
      const { actorId, targetUserId, resourceId } = payload;
      let message = "";

      if (actionType === "LIKE_POST") {
         message = `User ${actorId} liked your post ${resourceId}`;
      } else if (actionType === "COMMENT_ADD") {
         message = `User ${actorId} commented on your post ${resourceId}`;
      } else if (actionType === "FOLLOW_USER") {
         message = `User ${actorId} started following you.`;
      }

      if (message && targetUserId) {
         const notifId = `notif-${Date.now()}`;
         const notification = new Notification(notifId, targetUserId, message);
         notification.sendNotification();
      }
  }

  public dispatchNotification(notification: Notification): void {
    this.notifications.push(notification);
    console.log(`[Notification Sent to User ${notification.getUserId()}]: ${notification.getMessage()}`);
  }

  public getNotifications(userId: string): Notification[] {
    return this.notifications.filter(n => n.getUserId() === userId);
  }
}
