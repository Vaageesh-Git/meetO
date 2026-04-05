export class Post {
  private postId: string;
  private userId: string;
  private caption: string;
  private mediaUrl: string;
  private createdAt: Date;
  private likeCount: number;
  private commentCount: number;

  constructor(postId: string, userId: string, caption: string, mediaUrl: string) {
    this.postId = postId;
    this.userId = userId;
    this.caption = caption;
    this.mediaUrl = mediaUrl;
    this.createdAt = new Date();
    this.likeCount = 0;
    this.commentCount = 0;
  }

  public createPost(): string {
    return "Post created";
  }

  public editPost(newCaption: string): void {
    this.caption = newCaption;
  }

  public deletePost(): string {
    return "Post deleted";
  }

  public getPostDetails(): object {
    return {
      postId: this.postId,
      caption: this.caption,
      mediaUrl: this.mediaUrl,
    };
  }
}