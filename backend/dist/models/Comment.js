"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const uuid_1 = require("uuid");
class Comment {
    constructor(postId, userId, content) {
        this.id = (0, uuid_1.v4)();
        this.postId = postId;
        this.userId = userId;
        this.content = content;
        this.createdAt = new Date();
    }
    getId() { return this.id; }
    getPostId() { return this.postId; }
    getUserId() { return this.userId; }
    getContent() { return this.content; }
    getCreatedAt() { return this.createdAt; }
    setContent(content) { this.content = content; }
    toJSON() {
        return {
            id: this.id,
            postId: this.postId,
            userId: this.userId,
            content: this.content,
            createdAt: this.createdAt,
        };
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map