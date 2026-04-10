"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowService = void 0;
const Follow_1 = require("../models/Follow");
class FollowService {
    constructor(notificationService) {
        this.notificationService = notificationService;
        // "followerId:followeeId" -> Follow
        this.follows = new Map();
    }
    key(followerId, followeeId) {
        return `${followerId}:${followeeId}`;
    }
    follow(followerId, followeeId) {
        if (followerId === followeeId)
            throw new Error('Cannot follow yourself');
        if (this.isFollowing(followerId, followeeId))
            throw new Error('Already following');
        const follow = new Follow_1.Follow(followerId, followeeId);
        this.follows.set(this.key(followerId, followeeId), follow);
        // Observer: notify followee
        this.notificationService.sendNotification(followeeId, followerId, 'follow', followerId);
        return follow;
    }
    unfollow(followerId, followeeId) {
        const k = this.key(followerId, followeeId);
        if (!this.follows.has(k))
            throw new Error('Not following');
        this.follows.delete(k);
    }
    isFollowing(followerId, followeeId) {
        return this.follows.has(this.key(followerId, followeeId));
    }
    getFollowing(userId) {
        return Array.from(this.follows.values())
            .filter(f => f.getFollowerId() === userId)
            .map(f => f.getFolloweeId());
    }
    getFollowers(userId) {
        return Array.from(this.follows.values())
            .filter(f => f.getFolloweeId() === userId)
            .map(f => f.getFollowerId());
    }
}
exports.FollowService = FollowService;
//# sourceMappingURL=FollowService.js.map