"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const uuid_1 = require("uuid");
// Singleton pattern — one instance manages all sessions
class AuthService {
    constructor() {
        // token -> userId
        this.sessions = new Map();
    }
    static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }
    createSession(userId) {
        const token = (0, uuid_1.v4)();
        this.sessions.set(token, userId);
        return token;
    }
    validateSession(token) {
        return this.sessions.get(token) ?? null;
    }
    invalidateSession(token) {
        this.sessions.delete(token);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map