export class Follow {
  private followerId: string;
  private followeeId: string;
  private timestamp: Date;

  constructor(followerId: string, followeeId: string) {
    this.followerId = followerId;
    this.followeeId = followeeId;
    this.timestamp = new Date();
  }

  public getFollowerId(): string {
    return this.followerId;
  }

  public getFolloweeId(): string {
    return this.followeeId;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }
}
