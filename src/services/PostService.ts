import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { Like } from "../models/Like";
import { ISubject, IObserver } from "../patterns/Observer";
import { NotificationService } from "./NotificationService";

export class PostService implements ISubject {
  private static instance: PostService;
  public posts: Map<string, Post> = new Map();
  public comments: Map<string, Comment> = new Map();
  public likes: Like[] = [];
  private observers: IObserver[] = [];

  private constructor() {
    this.addObserver(NotificationService.getInstance());
  }

  public static getInstance(): PostService {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }
    return PostService.instance;
  }

  public addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  public notifyObservers(actionType: string, payload: any): void {
    for (const obs of this.observers) {
      obs.update(actionType, payload);
    }
  }

  public addPost(post: Post): void {
    this.posts.set(post.getPostId(), post);
  }

  public removePost(postId: string): void {
    this.posts.delete(postId);
  }

  public getAllPosts(): Post[] {
    return Array.from(this.posts.values());
  }

  public addComment(comment: Comment): void {
    this.comments.set(comment.getCommentId(), comment);
    const post = this.posts.get(comment.getPostId());
    if (post) {
      post.incrementComment();
      this.notifyObservers("COMMENT_ADD", { actorId: comment.getUserId(), targetUserId: post.getUserId(), resourceId: post.getPostId() });
    }
  }

  public removeComment(commentId: string): void {
    const comment = this.comments.get(commentId);
    if (comment) {
      const post = this.posts.get(comment.getPostId());
      if (post) post.decrementComment();
      this.comments.delete(commentId);
    }
  }

  public getComments(postId: string): Comment[] {
    return Array.from(this.comments.values()).filter(c => c.getPostId() === postId);
  }

  public likeContent(userId: string, targetId: string, targetType: "POST" | "COMMENT"): void {
    const idx = this.likes.findIndex(l => l.getUserId() === userId && l.getTargetId() === targetId);
    if (idx === -1) {
      this.likes.push(new Like(userId, targetId, targetType));
      if (targetType === "POST") {
        const post = this.posts.get(targetId);
        if (post) {
           post.incrementLike();
           this.notifyObservers("LIKE_POST", { actorId: userId, targetUserId: post.getUserId(), resourceId: post.getPostId() });
        }
      }
    }
  }

  public unlikeContent(userId: string, targetId: string): void {
    const idx = this.likes.findIndex(l => l.getUserId() === userId && l.getTargetId() === targetId);
    if (idx > -1) {
      const like = this.likes[idx];
      if (like.getTargetType() === "POST") {
        const post = this.posts.get(targetId);
        if (post) post.decrementLike();
      }
      this.likes.splice(idx, 1);
    }
  }
}
