"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const Comment_1 = require("../models/Comment");
class CommentService {
    constructor(postService, notificationService) {
        this.postService = postService;
        this.notificationService = notificationService;
        this.comments = new Map();
    }
    addComment(postId, userId, content) {
        const post = this.postService.getPostById(postId);
        if (!post)
            throw new Error('Post not found');
        const comment = new Comment_1.Comment(postId, userId, content);
        this.comments.set(comment.getId(), comment);
        post.incrementCommentCount();
        // Observer: notify post owner
        if (post.getUserId() !== userId) {
            this.notificationService.sendNotification(post.getUserId(), userId, 'comment', postId);
        }
        return comment;
    }
    getCommentsByPostId(postId) {
        return Array.from(this.comments.values())
            .filter(c => c.getPostId() === postId)
            .sort((a, b) => a.getCreatedAt().getTime() - b.getCreatedAt().getTime());
    }
    editComment(commentId, userId, content) {
        const comment = this.comments.get(commentId);
        if (!comment)
            throw new Error('Comment not found');
        if (comment.getUserId() !== userId)
            throw new Error('Unauthorized');
        comment.setContent(content);
        return comment;
    }
    deleteComment(commentId, userId) {
        const comment = this.comments.get(commentId);
        if (!comment)
            throw new Error('Comment not found');
        if (comment.getUserId() !== userId)
            throw new Error('Unauthorized');
        const post = this.postService.getPostById(comment.getPostId());
        if (post)
            post.decrementCommentCount();
        this.comments.delete(commentId);
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=CommentService.js.map