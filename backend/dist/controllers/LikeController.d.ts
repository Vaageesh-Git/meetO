import { Response } from 'express';
import { LikeService } from '../services/LikeService';
import { AuthRequest } from '../middleware/authMiddleware';
export declare class LikeController {
    private likeService;
    constructor(likeService: LikeService);
    likePost: (req: AuthRequest, res: Response) => void;
    unlikePost: (req: AuthRequest, res: Response) => void;
}
//# sourceMappingURL=LikeController.d.ts.map