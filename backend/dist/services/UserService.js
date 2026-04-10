"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const crypto_1 = require("crypto");
const User_1 = require("../models/User");
const Profile_1 = require("../models/Profile");
const AuthService_1 = require("./AuthService");
class UserService {
    constructor() {
        this.users = new Map();
        this.profiles = new Map();
        this.authService = AuthService_1.AuthService.getInstance();
    }
    hashPassword(password) {
        return (0, crypto_1.createHash)('sha256').update(password).digest('hex');
    }
    register(username, email, password) {
        const existing = Array.from(this.users.values()).find(u => u.getEmail() === email || u.getUsername() === username);
        if (existing)
            throw new Error('Username or email already taken');
        const user = new User_1.User(username, email, this.hashPassword(password));
        this.users.set(user.getId(), user);
        const profile = new Profile_1.Profile(user.getProfileId(), user.getId());
        this.profiles.set(profile.getId(), profile);
        const token = this.authService.createSession(user.getId());
        return { user, token };
    }
    login(email, password) {
        const user = Array.from(this.users.values()).find(u => u.getEmail() === email && u.getPasswordHash() === this.hashPassword(password));
        if (!user)
            throw new Error('Invalid credentials');
        const token = this.authService.createSession(user.getId());
        return { user, token };
    }
    logout(token) {
        this.authService.invalidateSession(token);
    }
    getUserById(id) {
        return this.users.get(id);
    }
    getAllUsers() {
        return Array.from(this.users.values());
    }
    updateAccount(userId, updates) {
        const user = this.users.get(userId);
        if (!user)
            throw new Error('User not found');
        if (updates.username)
            user.setUsername(updates.username);
        if (updates.email)
            user.setEmail(updates.email);
        return user;
    }
    deleteAccount(userId) {
        const user = this.users.get(userId);
        if (!user)
            throw new Error('User not found');
        this.profiles.delete(user.getProfileId());
        this.users.delete(userId);
    }
    getProfileByUserId(userId) {
        return Array.from(this.profiles.values()).find(p => p.getUserId() === userId);
    }
    getProfileById(profileId) {
        return this.profiles.get(profileId);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map