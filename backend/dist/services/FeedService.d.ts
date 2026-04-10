import { Feed } from '../models/Feed';
import { Post } from '../models/Post';
import { PostService } from './PostService';
import { FollowService } from './FollowService';
interface FeedStrategy {
    generate(posts: Post[]): string[];
}
export declare class FeedService {
    private postService;
    private followService;
    private feeds;
    private strategy;
    constructor(postService: PostService, followService: FollowService, strategy?: FeedStrategy);
    generateFeed(userId: string): Feed;
    refreshFeed(userId: string): Feed;
    getCachedFeed(userId: string): Feed | undefined;
}
export {};
//# sourceMappingURL=FeedService.d.ts.map