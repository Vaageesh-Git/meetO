"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeController = void 0;
class LikeController {
    constructor(likeService) {
        this.likeService = likeService;
        this.likePost = (req, res) => {
            try {
                const like = this.likeService.likePost(req.params.postId, req.userId);
                res.status(201).json({ like: like.toJSON() });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
        this.unlikePost = (req, res) => {
            try {
                this.likeService.unlikePost(req.params.postId, req.userId);
                res.json({ message: 'Unliked' });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
    }
}
exports.LikeController = LikeController;
//# sourceMappingURL=LikeController.js.map