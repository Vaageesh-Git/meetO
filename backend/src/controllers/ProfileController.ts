import { Response } from 'express';
import { ProfileService } from '../services/ProfileService';
import { AuthRequest } from '../middleware/authMiddleware';

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  getProfile = (req: AuthRequest, res: Response): void => {
    try {
      const profile = this.profileService.getProfile(req.params.userId as string);
      res.json({ profile: profile.toJSON() });
    } catch (e: any) { res.status(404).json({ error: e.message }); }
  };

  updateProfile = (req: AuthRequest, res: Response): void => {
    try {
      if (req.userId !== req.params.userId) { res.status(403).json({ error: 'Forbidden' }); return; }
      const profile = this.profileService.updateProfile(req.userId!, req.body);
      res.json({ profile: profile.toJSON() });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };
}
