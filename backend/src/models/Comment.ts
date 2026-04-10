import { v4 as uuidv4 } from 'uuid';

export class Comment {
  private id: string;
  private postId: string;
  private userId: string;
  private content: string;
  private createdAt: Date;

  constructor(postId: string, userId: string, content: string) {
    this.id = uuidv4();
    this.postId = postId;
    this.userId = userId;
    this.content = content;
    this.createdAt = new Date();
  }

  getId(): string { return this.id; }
  getPostId(): string { return this.postId; }
  getUserId(): string { return this.userId; }
  getContent(): string { return this.content; }
  getCreatedAt(): Date { return this.createdAt; }

  setContent(content: string): void { this.content = content; }

  toJSON() {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      content: this.content,
      createdAt: this.createdAt,
    };
  }
}
