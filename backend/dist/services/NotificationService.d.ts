import { Notification, NotificationType } from '../models/Notification';
export declare class NotificationService {
    private notifications;
    sendNotification(userId: string, actorId: string, type: NotificationType, targetId: string): Notification;
    getNotificationsForUser(userId: string): Notification[];
    markAsRead(notificationId: string): boolean;
}
//# sourceMappingURL=NotificationService.d.ts.map