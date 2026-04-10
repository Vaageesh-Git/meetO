import { v4 as uuidv4 } from 'uuid';

export class Post {
  private id: string;
  private userId: string;
  private content: string;
  private imageUrl: string;
  private likeCount: number;
  private commentCount: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(userId: string, content: string, imageUrl: string = '') {
    this.id = uuidv4();
    this.userId = userId;
    this.content = content;
    this.imageUrl = imageUrl;
    this.likeCount = 0;
    this.commentCount = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getId(): string { return this.id; }
  getUserId(): string { return this.userId; }
  getContent(): string { return this.content; }
  getImageUrl(): string { return this.imageUrl; }
  getLikeCount(): number { return this.likeCount; }
  getCommentCount(): number { return this.commentCount; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }

  setContent(content: string): void { this.content = content; this.updatedAt = new Date(); }
  setImageUrl(url: string): void { this.imageUrl = url; this.updatedAt = new Date(); }
  incrementLikeCount(): void { this.likeCount++; }
  decrementLikeCount(): void { if (this.likeCount > 0) this.likeCount--; }
  incrementCommentCount(): void { this.commentCount++; }
  decrementCommentCount(): void { if (this.commentCount > 0) this.commentCount--; }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      content: this.content,
      imageUrl: this.imageUrl,
      likeCount: this.likeCount,
      commentCount: this.commentCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
