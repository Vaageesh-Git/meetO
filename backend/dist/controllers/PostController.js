"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
class PostController {
    constructor(postService, likeService) {
        this.postService = postService;
        this.likeService = likeService;
        this.createPost = (req, res) => {
            try {
                const { content, imageUrl } = req.body;
                if (!content) {
                    res.status(400).json({ error: 'content required' });
                    return;
                }
                const post = this.postService.createPost(req.userId, content, imageUrl);
                res.status(201).json({ post: post.toJSON() });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
        this.getPost = (req, res) => {
            const id = req.params.id;
            const post = this.postService.getPostById(id);
            if (!post) {
                res.status(404).json({ error: 'Post not found' });
                return;
            }
            const liked = req.userId ? this.likeService.isLiked(post.getId(), req.userId) : false;
            res.json({ post: { ...post.toJSON(), liked } });
        };
        this.getPostsByUser = (req, res) => {
            const posts = this.postService.getPostsByUserId(req.params.userId);
            const postsWithLike = posts.map(p => ({
                ...p.toJSON(),
                liked: req.userId ? this.likeService.isLiked(p.getId(), req.userId) : false,
            }));
            res.json({ posts: postsWithLike });
        };
        this.getAllPosts = (req, res) => {
            const posts = this.postService.getAllPosts().map(p => ({
                ...p.toJSON(),
                liked: req.userId ? this.likeService.isLiked(p.getId(), req.userId) : false,
            }));
            res.json({ posts });
        };
        this.editPost = (req, res) => {
            try {
                const post = this.postService.editPost(req.params.id, req.userId, req.body.content, req.body.imageUrl);
                res.json({ post: post.toJSON() });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
        this.deletePost = (req, res) => {
            try {
                this.postService.deletePost(req.params.id, req.userId);
                res.json({ message: 'Post deleted' });
            }
            catch (e) {
                res.status(400).json({ error: e.message });
            }
        };
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map