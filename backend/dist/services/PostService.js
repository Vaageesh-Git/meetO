"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const Post_1 = require("../models/Post");
class PostService {
    constructor() {
        this.posts = new Map();
    }
    createPost(userId, content, imageUrl = '') {
        const post = new Post_1.Post(userId, content, imageUrl);
        this.posts.set(post.getId(), post);
        return post;
    }
    getPostById(id) {
        return this.posts.get(id);
    }
    getPostsByUserId(userId) {
        return Array.from(this.posts.values())
            .filter(p => p.getUserId() === userId)
            .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime());
    }
    getAllPosts() {
        return Array.from(this.posts.values())
            .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime());
    }
    editPost(postId, userId, content, imageUrl) {
        const post = this.posts.get(postId);
        if (!post)
            throw new Error('Post not found');
        if (post.getUserId() !== userId)
            throw new Error('Unauthorized');
        post.setContent(content);
        if (imageUrl !== undefined)
            post.setImageUrl(imageUrl);
        return post;
    }
    deletePost(postId, userId) {
        const post = this.posts.get(postId);
        if (!post)
            throw new Error('Post not found');
        if (post.getUserId() !== userId)
            throw new Error('Unauthorized');
        this.posts.delete(postId);
    }
    getPostsByIds(ids) {
        return ids
            .map(id => this.posts.get(id))
            .filter((p) => p !== undefined)
            .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime());
    }
}
exports.PostService = PostService;
//# sourceMappingURL=PostService.js.map