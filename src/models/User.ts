import { AuthService } from "../services/AuthService";
import { UserService } from "../services/UserService";

export class User {
  private userId: string;
  private username: string;
  private email: string;
  private passwordHash: string;
  private isActive: boolean;

  constructor(userId: string, username: string, email: string, passwordHash: string) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.isActive = true;
  }

  public getUserId(): string { return this.userId; }
  public getUsername(): string { return this.username; }
  public getEmail(): string { return this.email; }
  public getPasswordHash(): string { return this.passwordHash; }
  public getIsActive(): boolean { return this.isActive; }

  // Functional Methods as requested
  public register(): void {
    UserService.getInstance().addUser(this);
    console.log(`User ${this.username} registered.`);
  }

  public login(): string | null {
    if (!this.isActive) return null;
    return AuthService.getInstance().createSession(this.userId);
  }

  public logout(sessionId: string): void {
    AuthService.getInstance().invalidateSession(sessionId);
  }

  public updateAccount(username?: string, email?: string): void {
    if (username) this.username = username;
    if (email) this.email = email;
    console.log(`User ${this.userId} updated account.`);
  }

  public deleteAccount(): void {
    this.isActive = false;
    console.log(`User ${this.userId} marked as deleted.`);
  }

  public follow(followeeId: string): void {
    UserService.getInstance().addFollow(this.userId, followeeId);
  }

  public unfollow(followeeId: string): void {
    UserService.getInstance().removeFollow(this.userId, followeeId);
  }
}