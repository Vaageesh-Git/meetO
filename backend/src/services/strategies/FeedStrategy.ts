import { Post } from '../../models/Post';

export interface FeedStrategy {
  generate(posts: Post[]): string[];
}
