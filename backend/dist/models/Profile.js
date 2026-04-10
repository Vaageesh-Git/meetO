"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
class Profile {
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
        this.bio = '';
        this.avatarUrl = '';
        this.updatedAt = new Date();
    }
    getId() { return this.id; }
    getUserId() { return this.userId; }
    getBio() { return this.bio; }
    getAvatarUrl() { return this.avatarUrl; }
    getUpdatedAt() { return this.updatedAt; }
    setBio(bio) { this.bio = bio; this.updatedAt = new Date(); }
    setAvatarUrl(url) { this.avatarUrl = url; this.updatedAt = new Date(); }
    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            bio: this.bio,
            avatarUrl: this.avatarUrl,
            updatedAt: this.updatedAt,
        };
    }
}
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map