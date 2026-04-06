import { NotificationService } from "../services/NotificationService";

export class Notification {
  private notificationId: string;
  private userId: string; // The owner receiving it
  private message: string;
  private isRead: boolean;

  constructor(notificationId: string, userId: string, message: string) {
    this.notificationId = notificationId;
    this.userId = userId;
    this.message = message;
    this.isRead = false;
  }

  public getNotificationId(): string { return this.notificationId; }
  public getUserId(): string { return this.userId; }
  public getMessage(): string { return this.message; }

  public sendNotification(): void {
    NotificationService.getInstance().dispatchNotification(this);
  }
}
