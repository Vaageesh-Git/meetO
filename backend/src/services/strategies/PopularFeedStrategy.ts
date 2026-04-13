import { Post } from '../../models/Post';
import { FeedStrategy } from './FeedStrategy';

export class PopularFeedStrategy implements FeedStrategy {
  generate(posts: Post[]): string[] {
    // Rank by total engagement (likes + comments)
    return posts
      .sort((a, b) => {
        const scoreA = a.getLikeCount() + a.getCommentCount();
        const scoreB = b.getLikeCount() + b.getCommentCount();
        if (scoreB === scoreA) {
          // Fallback to chronological if score is same
          return b.getCreatedAt().getTime() - a.getCreatedAt().getTime();
        }
        return scoreB - scoreA;
      })
      .map(p => p.getId());
  }
}
