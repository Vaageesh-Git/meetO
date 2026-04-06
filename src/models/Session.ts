export class Session {
  private sessionId: string;
  private userId: string;
  private token: string;
  private createdAt: Date;
  private expiresAt: Date;

  constructor(sessionId: string, userId: string, token: string, expiresInMs: number) {
    this.sessionId = sessionId;
    this.userId = userId;
    this.token = token;
    this.createdAt = new Date();
    this.expiresAt = new Date(this.createdAt.getTime() + expiresInMs);
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getToken(): string {
    return this.token;
  }

  public isValid(): boolean {
    return new Date() < this.expiresAt;
  }
}
