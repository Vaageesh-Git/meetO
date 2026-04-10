import { Response } from 'express';
import { CommentService } from '../services/CommentService';
import { AuthRequest } from '../middleware/authMiddleware';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    addComment: (req: AuthRequest, res: Response) => void;
    getComments: (req: AuthRequest, res: Response) => void;
    editComment: (req: AuthRequest, res: Response) => void;
    deleteComment: (req: AuthRequest, res: Response) => void;
}
//# sourceMappingURL=CommentController.d.ts.map