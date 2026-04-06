import { PostService } from "../services/PostService";

export class Comment {
  private commentId: string;
  private postId: string;
  private userId: string;
  private text: string;
  private createdAt: Date;

  constructor(commentId: string, postId: string, userId: string, text: string) {
    this.commentId = commentId;
    this.postId = postId;
    this.userId = userId;
    this.text = text;
    this.createdAt = new Date();
  }

  public getCommentId(): string { return this.commentId; }
  public getPostId(): string { return this.postId; }
  public getUserId(): string { return this.userId; }
  public getText(): string { return this.text; }

  // Functional Methods
  public add(): void {
    PostService.getInstance().addComment(this);
  }

  public edit(newText: string): void {
    this.text = newText;
  }

  public delete(): void {
    PostService.getInstance().removeComment(this.commentId);
  }
}
