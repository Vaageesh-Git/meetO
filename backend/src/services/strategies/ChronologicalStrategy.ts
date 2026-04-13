import { Post } from '../../models/Post';
import { FeedStrategy } from './FeedStrategy';

export class ChronologicalStrategy implements FeedStrategy {
  generate(posts: Post[]): string[] {
    return posts
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime())
      .map(p => p.getId());
  }
}
