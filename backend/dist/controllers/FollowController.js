"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowController = void 0;
class FollowController {
    constructor(followService) {
        this.followService = followService;
        this.follow = (req, res) => {
            try {
                const follow = this.followService.follow(req.userId, req.params.id);
                res.status(201).json({ follow: follow.toJSON() });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
        this.unfollow = (req, res) => {
            try {
                this.followService.unfollow(req.userId, req.params.id);
                res.json({ message: 'Unfollowed' });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
        this.checkFollowing = (req, res) => {
            const isFollowing = this.followService.isFollowing(req.userId, req.params.id);
            res.json({ isFollowing });
        };
    }
}
exports.FollowController = FollowController;
//# sourceMappingURL=FollowController.js.map