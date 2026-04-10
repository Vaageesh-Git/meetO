"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedController = void 0;
class FeedController {
    constructor(feedService, postService, likeService) {
        this.feedService = feedService;
        this.postService = postService;
        this.likeService = likeService;
        this.getFeed = (req, res) => {
            const feed = this.feedService.generateFeed(req.userId);
            const posts = this.postService.getPostsByIds(feed.getPostIds()).map(p => ({
                ...p.toJSON(),
                liked: this.likeService.isLiked(p.getId(), req.userId),
            }));
            res.json({ posts, generatedAt: feed.getGeneratedAt() });
        };
        this.refreshFeed = (req, res) => {
            const feed = this.feedService.refreshFeed(req.userId);
            const posts = this.postService.getPostsByIds(feed.getPostIds()).map(p => ({
                ...p.toJSON(),
                liked: this.likeService.isLiked(p.getId(), req.userId),
            }));
            res.json({ posts, generatedAt: feed.getGeneratedAt() });
        };
    }
}
exports.FeedController = FeedController;
//# sourceMappingURL=FeedController.js.map