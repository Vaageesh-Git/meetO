import { Request, Response } from "express";
import { Feed } from "../models/Feed";
import { ChronologicalFeedStrategy } from "../patterns/Strategy";
import { PostService } from "../services/PostService";
import { UserService } from "../services/UserService";

export class FeedController {
  public static async getFeed(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.query;
      const strategy = new ChronologicalFeedStrategy();
      
      const feed = new Feed(
        userId as string, 
        strategy, 
        () => UserService.getInstance().getFollowingIds(userId as string),
        () => PostService.getInstance().getAllPosts()
      );
      feed.generateFeed();

      res.status(200).json({ posts: feed.getPosts() });
    } catch {
       res.status(400).json({ error: "Failed to generate feed" });
    }
  }
}
