export type NotificationType = 'like' | 'comment' | 'follow';
export declare class Notification {
    private id;
    private userId;
    private actorId;
    private type;
    private targetId;
    private isRead;
    private createdAt;
    constructor(userId: string, actorId: string, type: NotificationType, targetId: string);
    getId(): string;
    getUserId(): string;
    getActorId(): string;
    getType(): NotificationType;
    getTargetId(): string;
    getIsRead(): boolean;
    getCreatedAt(): Date;
    markAsRead(): void;
    toJSON(): {
        id: string;
        userId: string;
        actorId: string;
        type: NotificationType;
        targetId: string;
        isRead: boolean;
        createdAt: Date;
    };
}
//# sourceMappingURL=Notification.d.ts.map