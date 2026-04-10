import { Feed } from '../models/Feed';
import { Post } from '../models/Post';
import { PostService } from './PostService';
import { FollowService } from './FollowService';

// Strategy pattern — defines how feed posts are ordered
interface FeedStrategy {
  generate(posts: Post[]): string[];
}

// Concrete strategy: chronological (newest first)
class ChronologicalStrategy implements FeedStrategy {
  generate(posts: Post[]): string[] {
    return posts
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime())
      .map(p => p.getId());
  }
}

export class FeedService {
  private feeds: Map<string, Feed> = new Map();
  private strategy: FeedStrategy;

  constructor(
    private postService: PostService,
    private followService: FollowService,
    strategy: FeedStrategy = new ChronologicalStrategy()
  ) {
    this.strategy = strategy;
  }

  generateFeed(userId: string): Feed {
    const followedIds = this.followService.getFollowing(userId);
    const allPosts = followedIds.flatMap(id => this.postService.getPostsByUserId(id));

    const feed = new Feed(userId);
    feed.setPostIds(this.strategy.generate(allPosts));
    this.feeds.set(userId, feed);
    return feed;
  }

  refreshFeed(userId: string): Feed {
    return this.generateFeed(userId);
  }

  getCachedFeed(userId: string): Feed | undefined {
    return this.feeds.get(userId);
  }
}
