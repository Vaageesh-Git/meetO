"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedService = void 0;
const Feed_1 = require("../models/Feed");
// Concrete strategy: chronological (newest first)
class ChronologicalStrategy {
    generate(posts) {
        return posts
            .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime())
            .map(p => p.getId());
    }
}
class FeedService {
    constructor(postService, followService, strategy = new ChronologicalStrategy()) {
        this.postService = postService;
        this.followService = followService;
        this.feeds = new Map();
        this.strategy = strategy;
    }
    generateFeed(userId) {
        const followedIds = this.followService.getFollowing(userId);
        const allPosts = followedIds.flatMap(id => this.postService.getPostsByUserId(id));
        const feed = new Feed_1.Feed(userId);
        feed.setPostIds(this.strategy.generate(allPosts));
        this.feeds.set(userId, feed);
        return feed;
    }
    refreshFeed(userId) {
        return this.generateFeed(userId);
    }
    getCachedFeed(userId) {
        return this.feeds.get(userId);
    }
}
exports.FeedService = FeedService;
//# sourceMappingURL=FeedService.js.map