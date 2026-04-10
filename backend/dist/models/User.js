"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(username, email, passwordHash) {
        this.id = (0, uuid_1.v4)();
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.profileId = (0, uuid_1.v4)();
        this.createdAt = new Date();
    }
    getId() { return this.id; }
    getUsername() { return this.username; }
    getEmail() { return this.email; }
    getPasswordHash() { return this.passwordHash; }
    getProfileId() { return this.profileId; }
    getCreatedAt() { return this.createdAt; }
    setUsername(username) { this.username = username; }
    setEmail(email) { this.email = email; }
    setPasswordHash(hash) { this.passwordHash = hash; }
    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            profileId: this.profileId,
            createdAt: this.createdAt,
        };
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map