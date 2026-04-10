import { Comment } from '../models/Comment';
import { PostService } from './PostService';
import { NotificationService } from './NotificationService';

export class CommentService {
  private comments: Map<string, Comment> = new Map();

  constructor(
    private postService: PostService,
    private notificationService: NotificationService
  ) {}

  addComment(postId: string, userId: string, content: string): Comment {
    const post = this.postService.getPostById(postId);
    if (!post) throw new Error('Post not found');

    const comment = new Comment(postId, userId, content);
    this.comments.set(comment.getId(), comment);
    post.incrementCommentCount();

    // Observer: notify post owner
    if (post.getUserId() !== userId) {
      this.notificationService.sendNotification(post.getUserId(), userId, 'comment', postId);
    }
    return comment;
  }

  getCommentsByPostId(postId: string): Comment[] {
    return Array.from(this.comments.values())
      .filter(c => c.getPostId() === postId)
      .sort((a, b) => a.getCreatedAt().getTime() - b.getCreatedAt().getTime());
  }

  editComment(commentId: string, userId: string, content: string): Comment {
    const comment = this.comments.get(commentId);
    if (!comment) throw new Error('Comment not found');
    if (comment.getUserId() !== userId) throw new Error('Unauthorized');
    comment.setContent(content);
    return comment;
  }

  deleteComment(commentId: string, userId: string): void {
    const comment = this.comments.get(commentId);
    if (!comment) throw new Error('Comment not found');
    if (comment.getUserId() !== userId) throw new Error('Unauthorized');

    const post = this.postService.getPostById(comment.getPostId());
    if (post) post.decrementCommentCount();

    this.comments.delete(commentId);
  }
}
