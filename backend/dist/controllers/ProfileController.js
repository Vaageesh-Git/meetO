"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
        this.getProfile = (req, res) => {
            try {
                const profile = this.profileService.getProfile(req.params.userId);
                res.json({ profile: profile.toJSON() });
            }
            catch (e) {
                res.status(404).json({ error: e.message });
            }
        };
        this.updateProfile = (req, res) => {
            try {
                if (req.userId !== req.params.userId) {
                    res.status(403).json({ error: 'Forbidden' });
                    return;
                }
                const profile = this.profileService.updateProfile(req.userId, req.body);
                res.json({ profile: profile.toJSON() });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
    }
}
exports.ProfileController = ProfileController;
//# sourceMappingURL=ProfileController.js.map