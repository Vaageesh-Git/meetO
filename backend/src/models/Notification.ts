import { v4 as uuidv4 } from 'uuid';

export type NotificationType = 'like' | 'comment' | 'follow';

export class Notification {
  private id: string;
  private userId: string;    // recipient
  private actorId: string;   // who triggered
  private type: NotificationType;
  private targetId: string;  // postId or userId
  private isRead: boolean;
  private createdAt: Date;

  constructor(userId: string, actorId: string, type: NotificationType, targetId: string) {
    this.id = uuidv4();
    this.userId = userId;
    this.actorId = actorId;
    this.type = type;
    this.targetId = targetId;
    this.isRead = false;
    this.createdAt = new Date();
  }

  getId(): string { return this.id; }
  getUserId(): string { return this.userId; }
  getActorId(): string { return this.actorId; }
  getType(): NotificationType { return this.type; }
  getTargetId(): string { return this.targetId; }
  getIsRead(): boolean { return this.isRead; }
  getCreatedAt(): Date { return this.createdAt; }

  markAsRead(): void { this.isRead = true; }

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
