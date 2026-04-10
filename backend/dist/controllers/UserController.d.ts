import { Response } from 'express';
import { UserService } from '../services/UserService';
import { FollowService } from '../services/FollowService';
import { AuthRequest } from '../middleware/authMiddleware';
export declare class UserController {
    private userService;
    private followService;
    constructor(userService: UserService, followService: FollowService);
    getUser: (req: AuthRequest, res: Response) => void;
    getAllUsers: (req: AuthRequest, res: Response) => void;
    updateAccount: (req: AuthRequest, res: Response) => void;
    deleteAccount: (req: AuthRequest, res: Response) => void;
}
//# sourceMappingURL=UserController.d.ts.map