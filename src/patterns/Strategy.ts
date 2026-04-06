import { Post } from "../models/Post";

// Strategy interface as requested for Feed generation
export interface IFeedStrategy {
  generate(userId: string, followedUsers: string[], allPosts: Post[]): Post[];
}

export class ChronologicalFeedStrategy implements IFeedStrategy {
  public generate(userId: string, followedUsers: string[], allPosts: Post[]): Post[] {
    return allPosts
      .filter(p => followedUsers.includes(p.getUserId()))
      .sort((a, b) => b['createdAt'].getTime() - a['createdAt'].getTime()); 
  }
}
