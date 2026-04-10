import { Follow } from '../models/Follow';
import { NotificationService } from './NotificationService';
export declare class FollowService {
    private notificationService;
    private follows;
    constructor(notificationService: NotificationService);
    private key;
    follow(followerId: string, followeeId: string): Follow;
    unfollow(followerId: string, followeeId: string): void;
    isFollowing(followerId: string, followeeId: string): boolean;
    getFollowing(userId: string): string[];
    getFollowers(userId: string): string[];
}
//# sourceMappingURL=FollowService.d.ts.map