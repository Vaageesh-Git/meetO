"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    constructor(userService) {
        this.userService = userService;
        this.register = (req, res) => {
            try {
                const { username, email, password } = req.body;
                if (!username || !email || !password) {
                    res.status(400).json({ error: 'username, email and password required' });
                    return;
                }
                const { user, token } = this.userService.register(username, email, password);
                res.status(201).json({ user: user.toJSON(), token });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
        this.login = (req, res) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ error: 'email and password required' });
                    return;
                }
                const { user, token } = this.userService.login(email, password);
                res.json({ user: user.toJSON(), token });
            }
            catch (e) {
                res.status(401).json({ error: e.message });
            }
        };
        this.logout = (req, res) => {
            const header = req.headers.authorization;
            if (header?.startsWith('Bearer ')) {
                AuthService_1.AuthService.getInstance().invalidateSession(header.slice(7));
            }
            res.json({ message: 'Logged out' });
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map