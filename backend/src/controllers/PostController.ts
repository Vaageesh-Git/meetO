import { Response } from 'express';
import { PostService } from '../services/PostService';
import { LikeService } from '../services/LikeService';
import { AuthRequest } from '../middleware/authMiddleware';

export class PostController {
  constructor(
    private postService: PostService,
    private likeService: LikeService
  ) {}

  createPost = (req: AuthRequest, res: Response): void => {
    try {
      const { content, imageUrl } = req.body;
      if (!content) { res.status(400).json({ error: 'content required' }); return; }
      const post = this.postService.createPost(req.userId!, content, imageUrl);
      res.status(201).json({ post: post.toJSON() });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };

  getPost = (req: AuthRequest, res: Response): void => {
    const id = req.params.id as string;
    const post = this.postService.getPostById(id);
    if (!post) { res.status(404).json({ error: 'Post not found' }); return; }
    const liked = req.userId ? this.likeService.isLiked(post.getId(), req.userId) : false;
    res.json({ post: { ...post.toJSON(), liked } });
  };

  getPostsByUser = (req: AuthRequest, res: Response): void => {
    const posts = this.postService.getPostsByUserId(req.params.userId as string);
    const postsWithLike = posts.map(p => ({
      ...p.toJSON(),
      liked: req.userId ? this.likeService.isLiked(p.getId(), req.userId!) : false,
    }));
    res.json({ posts: postsWithLike });
  };

  getAllPosts = (req: AuthRequest, res: Response): void => {
    const posts = this.postService.getAllPosts().map(p => ({
      ...p.toJSON(),
      liked: req.userId ? this.likeService.isLiked(p.getId(), req.userId!) : false,
    }));
    res.json({ posts });
  };

  editPost = (req: AuthRequest, res: Response): void => {
    try {
      const post = this.postService.editPost(req.params.id as string, req.userId!, req.body.content, req.body.imageUrl);
      res.json({ post: post.toJSON() });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };

  deletePost = (req: AuthRequest, res: Response): void => {
    try {
      this.postService.deletePost(req.params.id as string, req.userId!);
      res.json({ message: 'Post deleted' });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };
}
