"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
class ProfileService {
    constructor(userService) {
        this.userService = userService;
    }
    getProfile(userId) {
        const profile = this.userService.getProfileByUserId(userId);
        if (!profile)
            throw new Error('Profile not found');
        return profile;
    }
    updateProfile(userId, updates) {
        const profile = this.userService.getProfileByUserId(userId);
        if (!profile)
            throw new Error('Profile not found');
        if (updates.bio !== undefined)
            profile.setBio(updates.bio);
        if (updates.avatarUrl !== undefined)
            profile.setAvatarUrl(updates.avatarUrl);
        return profile;
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=ProfileService.js.map