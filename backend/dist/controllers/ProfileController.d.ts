import { Response } from 'express';
import { ProfileService } from '../services/ProfileService';
import { AuthRequest } from '../middleware/authMiddleware';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    getProfile: (req: AuthRequest, res: Response) => void;
    updateProfile: (req: AuthRequest, res: Response) => void;
}
//# sourceMappingURL=ProfileController.d.ts.map