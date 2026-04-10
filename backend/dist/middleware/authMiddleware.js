"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const AuthService_1 = require("../services/AuthService");
function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Missing or invalid authorization header' });
        return;
    }
    const token = header.slice(7);
    const userId = AuthService_1.AuthService.getInstance().validateSession(token);
    if (!userId) {
        res.status(401).json({ error: 'Invalid or expired session' });
        return;
    }
    req.userId = userId;
    next();
}
//# sourceMappingURL=authMiddleware.js.map