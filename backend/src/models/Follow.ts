import { v4 as uuidv4 } from 'uuid';

export class Follow {
  private id: string;
  private followerId: string;
  private followeeId: string;
  private createdAt: Date;

  constructor(followerId: string, followeeId: string) {
    this.id = uuidv4();
    this.followerId = followerId;
    this.followeeId = followeeId;
    this.createdAt = new Date();
  }

  getId(): string { return this.id; }
  getFollowerId(): string { return this.followerId; }
  getFolloweeId(): string { return this.followeeId; }
  getCreatedAt(): Date { return this.createdAt; }

  toJSON() {
    return {
      id: this.id,
      followerId: this.followerId,
      followeeId: this.followeeId,
      createdAt: this.createdAt,
    };
  }
}
