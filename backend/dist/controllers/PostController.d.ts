import { Response } from 'express';
import { PostService } from '../services/PostService';
import { LikeService } from '../services/LikeService';
import { AuthRequest } from '../middleware/authMiddleware';
export declare class PostController {
    private postService;
    private likeService;
    constructor(postService: PostService, likeService: LikeService);
    createPost: (req: AuthRequest, res: Response) => void;
    getPost: (req: AuthRequest, res: Response) => void;
    getPostsByUser: (req: AuthRequest, res: Response) => void;
    getAllPosts: (req: AuthRequest, res: Response) => void;
    editPost: (req: AuthRequest, res: Response) => void;
    deletePost: (req: AuthRequest, res: Response) => void;
}
//# sourceMappingURL=PostController.d.ts.map