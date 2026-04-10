"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
const uuid_1 = require("uuid");
class Follow {
    constructor(followerId, followeeId) {
        this.id = (0, uuid_1.v4)();
        this.followerId = followerId;
        this.followeeId = followeeId;
        this.createdAt = new Date();
    }
    getId() { return this.id; }
    getFollowerId() { return this.followerId; }
    getFolloweeId() { return this.followeeId; }
    getCreatedAt() { return this.createdAt; }
    toJSON() {
        return {
            id: this.id,
            followerId: this.followerId,
            followeeId: this.followeeId,
            createdAt: this.createdAt,
        };
    }
}
exports.Follow = Follow;
//# sourceMappingURL=Follow.js.map