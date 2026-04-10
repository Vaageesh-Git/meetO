"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const uuid_1 = require("uuid");
class Post {
    constructor(userId, content, imageUrl = '') {
        this.id = (0, uuid_1.v4)();
        this.userId = userId;
        this.content = content;
        this.imageUrl = imageUrl;
        this.likeCount = 0;
        this.commentCount = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    getId() { return this.id; }
    getUserId() { return this.userId; }
    getContent() { return this.content; }
    getImageUrl() { return this.imageUrl; }
    getLikeCount() { return this.likeCount; }
    getCommentCount() { return this.commentCount; }
    getCreatedAt() { return this.createdAt; }
    getUpdatedAt() { return this.updatedAt; }
    setContent(content) { this.content = content; this.updatedAt = new Date(); }
    setImageUrl(url) { this.imageUrl = url; this.updatedAt = new Date(); }
    incrementLikeCount() { this.likeCount++; }
    decrementLikeCount() { if (this.likeCount > 0)
        this.likeCount--; }
    incrementCommentCount() { this.commentCount++; }
    decrementCommentCount() { if (this.commentCount > 0)
        this.commentCount--; }
    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            content: this.content,
            imageUrl: this.imageUrl,
            likeCount: this.likeCount,
            commentCount: this.commentCount,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map