import { Response } from 'express';
import { UserService } from '../services/UserService';
import { FollowService } from '../services/FollowService';
import { AuthRequest } from '../middleware/authMiddleware';

export class UserController {
  constructor(
    private userService: UserService,
    private followService: FollowService
  ) {}

  getUser = (req: AuthRequest, res: Response): void => {
    const id = req.params.id as string;
    const user = this.userService.getUserById(id);
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }
    const profile = this.userService.getProfileByUserId(id);
    const following = this.followService.getFollowing(id);
    const followers = this.followService.getFollowers(id);
    const isFollowing = req.userId ? this.followService.isFollowing(req.userId, id) : false;
    res.json({
      ...user.toJSON(),
      profile: profile?.toJSON(),
      followingCount: following.length,
      followersCount: followers.length,
      isFollowing
    });
  };

  getAllUsers = (req: AuthRequest, res: Response): void => {
    const users = this.userService.getAllUsers().map(u => {
      const profile = this.userService.getProfileByUserId(u.getId());
      return { ...u.toJSON(), profile: profile?.toJSON() };
    });
    res.json({ users });
  };

  updateAccount = (req: AuthRequest, res: Response): void => {
    try {
      if (req.userId !== req.params.id) { res.status(403).json({ error: 'Forbidden' }); return; }
      const user = this.userService.updateAccount(req.userId!, req.body);
      res.json({ user: user.toJSON() });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };

  deleteAccount = (req: AuthRequest, res: Response): void => {
    try {
      if (req.userId !== req.params.id) { res.status(403).json({ error: 'Forbidden' }); return; }
      this.userService.deleteAccount(req.userId!);
      res.json({ message: 'Account deleted' });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };
}
