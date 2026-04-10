export class Profile {
  private id: string;
  private userId: string;
  private bio: string;
  private avatarUrl: string;
  private updatedAt: Date;

  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
    this.bio = '';
    this.avatarUrl = '';
    this.updatedAt = new Date();
  }

  getId(): string { return this.id; }
  getUserId(): string { return this.userId; }
  getBio(): string { return this.bio; }
  getAvatarUrl(): string { return this.avatarUrl; }
  getUpdatedAt(): Date { return this.updatedAt; }

  setBio(bio: string): void { this.bio = bio; this.updatedAt = new Date(); }
  setAvatarUrl(url: string): void { this.avatarUrl = url; this.updatedAt = new Date(); }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      bio: this.bio,
      avatarUrl: this.avatarUrl,
      updatedAt: this.updatedAt,
    };
  }
}
