import { Response } from 'express';
import { FollowService } from '../services/FollowService';
import { AuthRequest } from '../middleware/authMiddleware';
export declare class FollowController {
    private followService;
    constructor(followService: FollowService);
    follow: (req: AuthRequest, res: Response) => void;
    unfollow: (req: AuthRequest, res: Response) => void;
    checkFollowing: (req: AuthRequest, res: Response) => void;
}
//# sourceMappingURL=FollowController.d.ts.map