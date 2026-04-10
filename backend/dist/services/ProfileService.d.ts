import { Profile } from '../models/Profile';
import { UserService } from './UserService';
export declare class ProfileService {
    private userService;
    constructor(userService: UserService);
    getProfile(userId: string): Profile;
    updateProfile(userId: string, updates: {
        bio?: string;
        avatarUrl?: string;
    }): Profile;
}
//# sourceMappingURL=ProfileService.d.ts.map