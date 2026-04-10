"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const uuid_1 = require("uuid");
class Like {
    constructor(postId, userId) {
        this.id = (0, uuid_1.v4)();
        this.postId = postId;
        this.userId = userId;
        this.createdAt = new Date();
    }
    getId() { return this.id; }
    getPostId() { return this.postId; }
    getUserId() { return this.userId; }
    getCreatedAt() { return this.createdAt; }
    toJSON() {
        return {
            id: this.id,
            postId: this.postId,
            userId: this.userId,
            createdAt: this.createdAt,
        };
    }
}
exports.Like = Like;
//# sourceMappingURL=Like.js.map