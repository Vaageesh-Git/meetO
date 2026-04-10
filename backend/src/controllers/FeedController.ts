import { Response } from 'express';
import { FeedService } from '../services/FeedService';
import { PostService } from '../services/PostService';
import { LikeService } from '../services/LikeService';
import { AuthRequest } from '../middleware/authMiddleware';

export class FeedController {
  constructor(
    private feedService: FeedService,
    private postService: PostService,
    private likeService: LikeService
  ) {}

  getFeed = (req: AuthRequest, res: Response): void => {
    const feed = this.feedService.generateFeed(req.userId!);
    const posts = this.postService.getPostsByIds(feed.getPostIds()).map(p => ({
      ...p.toJSON(),
      liked: this.likeService.isLiked(p.getId(), req.userId!),
    }));
    res.json({ posts, generatedAt: feed.getGeneratedAt() });
  };

  refreshFeed = (req: AuthRequest, res: Response): void => {
    const feed = this.feedService.refreshFeed(req.userId!);
    const posts = this.postService.getPostsByIds(feed.getPostIds()).map(p => ({
      ...p.toJSON(),
      liked: this.likeService.isLiked(p.getId(), req.userId!),
    }));
    res.json({ posts, generatedAt: feed.getGeneratedAt() });
  };
}
