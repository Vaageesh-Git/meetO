export class Profile {
  private userId: string;
  private bio: string;
  private avatarUrl: string;

  constructor(userId: string, bio: string = "", avatarUrl: string = "") {
    this.userId = userId;
    this.bio = bio;
    this.avatarUrl = avatarUrl;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getBio(): string {
    return this.bio;
  }

  public getAvatarUrl(): string {
    return this.avatarUrl;
  }

  public updateBio(newBio: string): void {
    this.bio = newBio;
  }

  public updateAvatarUrl(newUrl: string): void {
    this.avatarUrl = newUrl;
  }
}