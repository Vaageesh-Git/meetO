import { EventBus } from '../EventBus';
import { notificationQueue } from '../../queues/NotificationQueue';
import { NotificationType } from '../../models/Notification';

export class NotificationSubscriber {
  constructor() {
    const eventBus = EventBus.getInstance();

    // Mapping business events to notifications using async queue
    eventBus.subscribe('LikeCreated', this.handleLikeCreated.bind(this));
    eventBus.subscribe('CommentCreated', this.handleCommentCreated.bind(this));
    eventBus.subscribe('FollowCreated', this.handleFollowCreated.bind(this));
  }

  private async handleLikeCreated(payload: { postOwnerId: string, actorId: string, postId: string }) {
    if (payload.postOwnerId === payload.actorId) return; // Don't notify self
    
    await notificationQueue.add('send-notification', {
      userId: payload.postOwnerId,
      actorId: payload.actorId,
      type: 'like',
      targetId: payload.postId
    });
  }

  private async handleCommentCreated(payload: { postOwnerId: string, actorId: string, commentId: string }) {
    if (payload.postOwnerId === payload.actorId) return;

    await notificationQueue.add('send-notification', {
      userId: payload.postOwnerId,
      actorId: payload.actorId,
      type: 'comment',
      targetId: payload.commentId
    });
  }

  private async handleFollowCreated(payload: { targetUserId: string, actorId: string }) {
    await notificationQueue.add('send-notification', {
      userId: payload.targetUserId,
      actorId: payload.actorId,
      type: 'follow',
      targetId: payload.actorId // Usually target is the actor's profile
    });
  }
}
