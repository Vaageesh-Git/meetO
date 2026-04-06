export class Like {
  private userId: string;
  private targetId: string; // postId or commentId
  private targetType: "POST" | "COMMENT";

  constructor(userId: string, targetId: string, targetType: "POST" | "COMMENT") {
    this.userId = userId;
    this.targetId = targetId;
    this.targetType = targetType;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getTargetId(): string {
    return this.targetId;
  }

  public getTargetType(): string {
    return this.targetType;
  }
}
