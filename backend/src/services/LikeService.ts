import { Like } from '../models/Like';
import { PostService } from './PostService';
import { NotificationService } from './NotificationService';

export class LikeService {
  // "postId:userId" -> Like
  private likes: Map<string, Like> = new Map();

  constructor(
    private postService: PostService,
    private notificationService: NotificationService
  ) {}

  private key(postId: string, userId: string): string {
    return `${postId}:${userId}`;
  }

  likePost(postId: string, userId: string): Like {
    if (this.likes.has(this.key(postId, userId))) {
      throw new Error('Already liked');
    }
    const post = this.postService.getPostById(postId);
    if (!post) throw new Error('Post not found');

    const like = new Like(postId, userId);
    this.likes.set(this.key(postId, userId), like);
    post.incrementLikeCount();

    // Observer: notify post owner
    if (post.getUserId() !== userId) {
      this.notificationService.sendNotification(post.getUserId(), userId, 'like', postId);
    }
    return like;
  }

  unlikePost(postId: string, userId: string): void {
    const k = this.key(postId, userId);
    if (!this.likes.has(k)) throw new Error('Not liked');

    const post = this.postService.getPostById(postId);
    if (post) post.decrementLikeCount();

    this.likes.delete(k);
  }

  isLiked(postId: string, userId: string): boolean {
    return this.likes.has(this.key(postId, userId));
  }

  getLikesByPostId(postId: string): Like[] {
    return Array.from(this.likes.values()).filter(l => l.getPostId() === postId);
  }
}
