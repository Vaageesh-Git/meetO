import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserService } from '../services/UserService';

const router = Router();
const userService = new UserService();
const authController = new AuthController(userService);

// Store userService on app for reuse — handled in app.ts
export { userService };
export default router;

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
