"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const Like_1 = require("../models/Like");
class LikeService {
    constructor(postService, notificationService) {
        this.postService = postService;
        this.notificationService = notificationService;
        // "postId:userId" -> Like
        this.likes = new Map();
    }
    key(postId, userId) {
        return `${postId}:${userId}`;
    }
    likePost(postId, userId) {
        if (this.likes.has(this.key(postId, userId))) {
            throw new Error('Already liked');
        }
        const post = this.postService.getPostById(postId);
        if (!post)
            throw new Error('Post not found');
        const like = new Like_1.Like(postId, userId);
        this.likes.set(this.key(postId, userId), like);
        post.incrementLikeCount();
        // Observer: notify post owner
        if (post.getUserId() !== userId) {
            this.notificationService.sendNotification(post.getUserId(), userId, 'like', postId);
        }
        return like;
    }
    unlikePost(postId, userId) {
        const k = this.key(postId, userId);
        if (!this.likes.has(k))
            throw new Error('Not liked');
        const post = this.postService.getPostById(postId);
        if (post)
            post.decrementLikeCount();
        this.likes.delete(k);
    }
    isLiked(postId, userId) {
        return this.likes.has(this.key(postId, userId));
    }
    getLikesByPostId(postId) {
        return Array.from(this.likes.values()).filter(l => l.getPostId() === postId);
    }
}
exports.LikeService = LikeService;
//# sourceMappingURL=LikeService.js.map