"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const uuid_1 = require("uuid");
class Notification {
    constructor(userId, actorId, type, targetId) {
        this.id = (0, uuid_1.v4)();
        this.userId = userId;
        this.actorId = actorId;
        this.type = type;
        this.targetId = targetId;
        this.isRead = false;
        this.createdAt = new Date();
    }
    getId() { return this.id; }
    getUserId() { return this.userId; }
    getActorId() { return this.actorId; }
    getType() { return this.type; }
    getTargetId() { return this.targetId; }
    getIsRead() { return this.isRead; }
    getCreatedAt() { return this.createdAt; }
    markAsRead() { this.isRead = true; }
    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            actorId: this.actorId,
            type: this.type,
            targetId: this.targetId,
            isRead: this.isRead,
            createdAt: this.createdAt,
        };
    }
}
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map