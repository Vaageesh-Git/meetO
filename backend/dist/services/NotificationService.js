"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const Notification_1 = require("../models/Notification");
// Observer pattern — receives events from LikeService, CommentService, FollowService
class NotificationService {
    constructor() {
        this.notifications = new Map();
    }
    sendNotification(userId, actorId, type, targetId) {
        const notification = new Notification_1.Notification(userId, actorId, type, targetId);
        this.notifications.set(notification.getId(), notification);
        return notification;
    }
    getNotificationsForUser(userId) {
        return Array.from(this.notifications.values())
            .filter(n => n.getUserId() === userId)
            .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime());
    }
    markAsRead(notificationId) {
        const notification = this.notifications.get(notificationId);
        if (!notification)
            return false;
        notification.markAsRead();
        return true;
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=NotificationService.js.map