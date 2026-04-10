import { v4 as uuidv4 } from 'uuid';

export class Like {
  private id: string;
  private postId: string;
  private userId: string;
  private createdAt: Date;

  constructor(postId: string, userId: string) {
    this.id = uuidv4();
    this.postId = postId;
    this.userId = userId;
    this.createdAt = new Date();
  }

  getId(): string { return this.id; }
  getPostId(): string { return this.postId; }
  getUserId(): string { return this.userId; }
  getCreatedAt(): Date { return this.createdAt; }

  toJSON() {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
    };
  }
}
