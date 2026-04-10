"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
        this.getNotifications = (req, res) => {
            const notifications = this.notificationService.getNotificationsForUser(req.userId);
            res.json({ notifications: notifications.map(n => n.toJSON()) });
        };
        this.markAsRead = (req, res) => {
            const success = this.notificationService.markAsRead(req.params.id);
            if (!success) {
                res.status(404).json({ error: 'Notification not found' });
                return;
            }
            res.json({ message: 'Marked as read' });
        };
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=NotificationController.js.map