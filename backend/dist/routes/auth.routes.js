"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const UserService_1 = require("../services/UserService");
const router = (0, express_1.Router)();
const userService = new UserService_1.UserService();
exports.userService = userService;
const authController = new AuthController_1.AuthController(userService);
exports.default = router;
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
//# sourceMappingURL=auth.routes.js.map