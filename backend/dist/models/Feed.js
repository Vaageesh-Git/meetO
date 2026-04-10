"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feed = void 0;
class Feed {
    constructor(userId) {
        this.userId = userId;
        this.postIds = [];
        this.generatedAt = new Date();
    }
    getUserId() { return this.userId; }
    getPostIds() { return [...this.postIds]; }
    getGeneratedAt() { return this.generatedAt; }
    setPostIds(postIds) {
        this.postIds = postIds;
        this.generatedAt = new Date();
    }
    toJSON() {
        return {
            userId: this.userId,
            postIds: this.postIds,
            generatedAt: this.generatedAt,
        };
    }
}
exports.Feed = Feed;
//# sourceMappingURL=Feed.js.map