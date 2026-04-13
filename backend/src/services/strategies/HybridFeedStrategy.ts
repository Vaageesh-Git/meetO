import { Post } from '../../models/Post';
import { FeedStrategy } from './FeedStrategy';

export class HybridFeedStrategy implements FeedStrategy {
  generate(posts: Post[]): string[] {
    const now = new Date().getTime();
    
    return posts
      .sort((a, b) => {
        // Simple hybrid algorithm: give points for engagement, but penalize for age
        const ageHoursA = (now - a.getCreatedAt().getTime()) / (1000 * 60 * 60);
        const ageHoursB = (now - b.getCreatedAt().getTime()) / (1000 * 60 * 60);

        const scoreA = (a.getLikeCount() + a.getCommentCount()) - (ageHoursA * 0.5); // Decay factor
        const scoreB = (b.getLikeCount() + b.getCommentCount()) - (ageHoursB * 0.5);

        return scoreB - scoreA;
      })
      .map(p => p.getId());
  }
}
