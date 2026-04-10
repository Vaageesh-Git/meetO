import { Response } from 'express';
import { CommentService } from '../services/CommentService';
import { AuthRequest } from '../middleware/authMiddleware';

export class CommentController {
  constructor(private commentService: CommentService) {}

  addComment = (req: AuthRequest, res: Response): void => {
    try {
      const { content } = req.body;
      if (!content) { res.status(400).json({ error: 'content required' }); return; }
      const comment = this.commentService.addComment(req.params.postId as string, req.userId!, content);
      res.status(201).json({ comment: comment.toJSON() });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };

  getComments = (req: AuthRequest, res: Response): void => {
    const comments = this.commentService.getCommentsByPostId(req.params.postId as string);
    res.json({ comments: comments.map(c => c.toJSON()) });
  };

  editComment = (req: AuthRequest, res: Response): void => {
    try {
      const comment = this.commentService.editComment(req.params.id as string, req.userId!, req.body.content);
      res.json({ comment: comment.toJSON() });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };

  deleteComment = (req: AuthRequest, res: Response): void => {
    try {
      this.commentService.deleteComment(req.params.id as string, req.userId!);
      res.json({ message: 'Comment deleted' });
    } catch (e: any) { res.status(400).json({ error: e.message }); }
  };
}
