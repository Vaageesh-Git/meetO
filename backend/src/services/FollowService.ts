import { Follow } from '../models/Follow';
import { NotificationService } from './NotificationService';

export class FollowService {
  // "followerId:followeeId" -> Follow
  private follows: Map<string, Follow> = new Map();

  constructor(private notificationService: NotificationService) {}

  private key(followerId: string, followeeId: string): string {
    return `${followerId}:${followeeId}`;
  }

  follow(followerId: string, followeeId: string): Follow {
    if (followerId === followeeId) throw new Error('Cannot follow yourself');
    if (this.isFollowing(followerId, followeeId)) throw new Error('Already following');

    const follow = new Follow(followerId, followeeId);
    this.follows.set(this.key(followerId, followeeId), follow);

    // Observer: notify followee
    this.notificationService.sendNotification(followeeId, followerId, 'follow', followerId);
    return follow;
  }

  unfollow(followerId: string, followeeId: string): void {
    const k = this.key(followerId, followeeId);
    if (!this.follows.has(k)) throw new Error('Not following');
    this.follows.delete(k);
  }

  isFollowing(followerId: string, followeeId: string): boolean {
    return this.follows.has(this.key(followerId, followeeId));
  }

  getFollowing(userId: string): string[] {
    return Array.from(this.follows.values())
      .filter(f => f.getFollowerId() === userId)
      .map(f => f.getFolloweeId());
  }

  getFollowers(userId: string): string[] {
    return Array.from(this.follows.values())
      .filter(f => f.getFolloweeId() === userId)
      .map(f => f.getFollowerId());
  }
}
