export class Profile {
  private profileId: string;
  private userId: string;
  private bio: string;
  private profilePictureUrl: string;
  private followerCount: number;
  private followingCount: number;

  constructor(profileId: string, userId: string) {
    this.profileId = profileId;
    this.userId = userId;
    this.bio = "";
    this.profilePictureUrl = "";
    this.followerCount = 0;
    this.followingCount = 0;
  }

  public updateBio(bio: string): void {
    this.bio = bio;
  }

  public updateProfilePicture(url: string): void {
    this.profilePictureUrl = url;
  }

  public getFollowers(): number {
    return this.followerCount;
  }

  public getFollowing(): number {
    return this.followingCount;
  }
}