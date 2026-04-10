import { Response } from 'express';
import { LikeService } from '../services/LikeService';
import { AuthRequest } from '../middleware/authMiddleware';

export class LikeController {
  constructor(private likeService: LikeService) {}

  likePost = (req: AuthRequest, res: Response): void => {
    try {
      const like = this.likeService.likePost(req.params.postId as string, req.userId!);
      res.status(201).json({ like: like.toJSON() });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };

  unlikePost = (req: AuthRequest, res: Response): void => {
    try {
      this.likeService.unlikePost(req.params.postId as string, req.userId!);
      res.json({ message: 'Unliked' });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };
}
