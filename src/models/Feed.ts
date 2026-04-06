import { Post } from "./Post";
import { IFeedStrategy } from "../patterns/Strategy";

export class Feed {
  private userId: string;
  private posts: Post[];
  private strategy: IFeedStrategy;
  // External resources needed to execute strategy
  private followedUsersProvider: () => string[];
  private allPostsProvider: () => Post[];

  constructor(
    userId: string, 
    strategy: IFeedStrategy, 
    followedUsersProvider: () => string[], 
    allPostsProvider: () => Post[]
  ) {
    this.userId = userId;
    this.posts = [];
    this.strategy = strategy;
    this.followedUsersProvider = followedUsersProvider;
    this.allPostsProvider = allPostsProvider;
  }

  public getUserId(): string { return this.userId; }
  public getPosts(): Post[] { return this.posts; }

  public generateFeed(): void {
    const followedUsers = this.followedUsersProvider();
    const allPosts = this.allPostsProvider();
    this.posts = this.strategy.generate(this.userId, followedUsers, allPosts);
  }

  public refreshFeed(): void {
    this.generateFeed();
  }
}
