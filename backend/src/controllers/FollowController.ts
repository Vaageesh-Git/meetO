import { Response } from 'express';
import { FollowService } from '../services/FollowService';
import { AuthRequest } from '../middleware/authMiddleware';

export class FollowController {
  constructor(private followService: FollowService) {}

  follow = (req: AuthRequest, res: Response): void => {
    try {
      const follow = this.followService.follow(req.userId!, req.params.id as string);
      res.status(201).json({ follow: follow.toJSON() });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };

  unfollow = (req: AuthRequest, res: Response): void => {
    try {
      this.followService.unfollow(req.userId!, req.params.id as string);
      res.json({ message: 'Unfollowed' });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };

  checkFollowing = (req: AuthRequest, res: Response): void => {
    const isFollowing = this.followService.isFollowing(req.userId!, req.params.id as string);
    res.json({ isFollowing });
  };
}
