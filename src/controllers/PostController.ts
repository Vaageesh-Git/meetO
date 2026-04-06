import { Request, Response } from "express";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { PostService } from "../services/PostService";

export class PostController {
  public static async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { postId, authorId, content } = req.body;
      const post = new Post(postId, authorId, content);
      post.create();
      res.status(201).json({ message: "Post created" });
    } catch {
      res.status(400).json({ error: "Failed to create post" });
    }
  }

  public static async addComment(req: Request, res: Response): Promise<void> {
    try {
      const { postId } = req.params;
      const { commentId, authorId, text } = req.body;
      const comment = new Comment(commentId, postId as string, authorId, text);
      comment.add();
      res.status(201).json({ message: "Comment added" });
    } catch {
      res.status(400).json({ error: "Failed to add comment" });
    }
  }

  public static async likePost(req: Request, res: Response): Promise<void> {
    try {
      const { postId } = req.params;
      const { userId } = req.body;
      PostService.getInstance().likeContent(userId, postId as string, "POST");
      res.status(200).json({ message: "Post liked" });
    } catch {
      res.status(400).json({ error: "Failed to like post" });
    }
  }
}
