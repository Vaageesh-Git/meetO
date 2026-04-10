"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
        this.addComment = (req, res) => {
            try {
                const { content } = req.body;
                if (!content) {
                    res.status(400).json({ error: 'content required' });
                    return;
                }
                const comment = this.commentService.addComment(req.params.postId, req.userId, content);
                res.status(201).json({ comment: comment.toJSON() });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
        this.getComments = (req, res) => {
            const comments = this.commentService.getCommentsByPostId(req.params.postId);
            res.json({ comments: comments.map(c => c.toJSON()) });
        };
        this.editComment = (req, res) => {
            try {
                const comment = this.commentService.editComment(req.params.id, req.userId, req.body.content);
                res.json({ comment: comment.toJSON() });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
        this.deleteComment = (req, res) => {
            try {
                this.commentService.deleteComment(req.params.id, req.userId);
                res.json({ message: 'Comment deleted' });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=CommentController.js.map