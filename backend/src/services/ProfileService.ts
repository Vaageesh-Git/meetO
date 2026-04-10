import { Profile } from '../models/Profile';
import { UserService } from './UserService';

export class ProfileService {
  constructor(private userService: UserService) {}

  getProfile(userId: string): Profile {
    const profile = this.userService.getProfileByUserId(userId);
    if (!profile) throw new Error('Profile not found');
    return profile;
  }

  updateProfile(userId: string, updates: { bio?: string; avatarUrl?: string }): Profile {
    const profile = this.userService.getProfileByUserId(userId);
    if (!profile) throw new Error('Profile not found');
    if (updates.bio !== undefined) profile.setBio(updates.bio);
    if (updates.avatarUrl !== undefined) profile.setAvatarUrl(updates.avatarUrl);
    return profile;
  }
}
