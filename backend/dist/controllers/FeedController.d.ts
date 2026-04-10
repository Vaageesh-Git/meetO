import { Response } from 'express';
import { FeedService } from '../services/FeedService';
import { PostService } from '../services/PostService';
import { LikeService } from '../services/LikeService';
import { AuthRequest } from '../middleware/authMiddleware';
export declare class FeedController {
    private feedService;
    private postService;
    private likeService;
    constructor(feedService: FeedService, postService: PostService, likeService: LikeService);
    getFeed: (req: AuthRequest, res: Response) => void;
    refreshFeed: (req: AuthRequest, res: Response) => void;
}
//# sourceMappingURL=FeedController.d.ts.map