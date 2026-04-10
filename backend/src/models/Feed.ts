export class Feed {
  private userId: string;
  private postIds: string[];
  private generatedAt: Date;

  constructor(userId: string) {
    this.userId = userId;
    this.postIds = [];
    this.generatedAt = new Date();
  }

  getUserId(): string { return this.userId; }
  getPostIds(): string[] { return [...this.postIds]; }
  getGeneratedAt(): Date { return this.generatedAt; }

  setPostIds(postIds: string[]): void {
    this.postIds = postIds;
    this.generatedAt = new Date();
  }

  toJSON() {
    return {
      userId: this.userId,
      postIds: this.postIds,
      generatedAt: this.generatedAt,
    };
  }
}
