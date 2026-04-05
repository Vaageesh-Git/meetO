export class User {
  private userId: string;
  private username: string;
  private email: string;
  private passwordHash: string;
  private createdAt: Date;
  private isActive: boolean;

  constructor(
    userId: string,
    username: string,
    email: string,
    passwordHash: string
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = new Date();
    this.isActive = true;
  }

  public register(): string {
    return "User registered successfully";
  }

  public login(): string {
    return "User logged in";
  }

  public logout(): string {
    return "User logged out";
  }

  public updateProfile(): string {
    return "Profile updated";
  }

  public deleteAccount(): string {
    this.isActive = false;
    return "Account deleted";
  }

  public followUser(userId: string): string {
    return `Following user ${userId}`;
  }

  public unfollowUser(userId: string): string {
    return `Unfollowed user ${userId}`;
  }
}