import { PostService } from "../services/PostService";

export class Post {
  private postId: string;
  private userId: string;
  private content: string;
  private likeCount: number;
  private commentCount: number;
  private createdAt: Date;

  constructor(postId: string, userId: string, content: string) {
    this.postId = postId;
    this.userId = userId;
    this.content = content;
    this.likeCount = 0;
    this.commentCount = 0;
    this.createdAt = new Date();
  }

  public getPostId(): string { return this.postId; }
  public getUserId(): string { return this.userId; }
  public getContent(): string { return this.content; }
  public getLikeCount(): number { return this.likeCount; }
  public getCommentCount(): number { return this.commentCount; }

  public incrementLike(): void { this.likeCount++; }
  public decrementLike(): void { this.likeCount--; }
  public incrementComment(): void { this.commentCount++; }
  public decrementComment(): void { this.commentCount--; }

  // Functional Methods
  public create(): void {
    PostService.getInstance().addPost(this);
    console.log(`Post ${this.postId} created.`);
  }

  public edit(newContent: string): void {
    this.content = newContent;
    console.log(`Post ${this.postId} edited.`);
  }

  public delete(): void {
    PostService.getInstance().removePost(this.postId);
    console.log(`Post ${this.postId} deleted.`);
  }
}