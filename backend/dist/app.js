"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Services
const UserService_1 = require("./services/UserService");
const ProfileService_1 = require("./services/ProfileService");
const PostService_1 = require("./services/PostService");
const CommentService_1 = require("./services/CommentService");
const LikeService_1 = require("./services/LikeService");
const FollowService_1 = require("./services/FollowService");
const FeedService_1 = require("./services/FeedService");
const NotificationService_1 = require("./services/NotificationService");
const MessageService_1 = require("./services/MessageService");
// Controllers
const AuthController_1 = require("./controllers/AuthController");
const UserController_1 = require("./controllers/UserController");
const ProfileController_1 = require("./controllers/ProfileController");
const PostController_1 = require("./controllers/PostController");
const CommentController_1 = require("./controllers/CommentController");
const LikeController_1 = require("./controllers/LikeController");
const FollowController_1 = require("./controllers/FollowController");
const FeedController_1 = require("./controllers/FeedController");
const NotificationController_1 = require("./controllers/NotificationController");
const MessageController_1 = require("./controllers/MessageController");
// Middleware
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ─── Dependency Injection ────────────────────────────────────────
const userService = new UserService_1.UserService();
const notificationService = new NotificationService_1.NotificationService();
const followService = new FollowService_1.FollowService(notificationService);
const postService = new PostService_1.PostService();
const commentService = new CommentService_1.CommentService(postService, notificationService);
const likeService = new LikeService_1.LikeService(postService, notificationService);
const feedService = new FeedService_1.FeedService(postService, followService);
const profileService = new ProfileService_1.ProfileService(userService);
const messageService = new MessageService_1.MessageService();
// ─── Controllers ────────────────────────────────────────────────
const authController = new AuthController_1.AuthController(userService);
const userController = new UserController_1.UserController(userService, followService);
const profileController = new ProfileController_1.ProfileController(profileService);
const postController = new PostController_1.PostController(postService, likeService);
const commentController = new CommentController_1.CommentController(commentService);
const likeController = new LikeController_1.LikeController(likeService);
const followController = new FollowController_1.FollowController(followService);
const feedController = new FeedController_1.FeedController(feedService, postService, likeService);
const notificationController = new NotificationController_1.NotificationController(notificationService);
const messageController = new MessageController_1.MessageController(messageService, userService);
// ─── Routes ─────────────────────────────────────────────────────
// Auth (public)
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.post('/api/auth/logout', authController.logout);
// Users
app.get('/api/users', authMiddleware_1.authMiddleware, userController.getAllUsers);
app.get('/api/users/:id', authMiddleware_1.authMiddleware, userController.getUser);
app.put('/api/users/:id', authMiddleware_1.authMiddleware, userController.updateAccount);
app.delete('/api/users/:id', authMiddleware_1.authMiddleware, userController.deleteAccount);
// Profiles
app.get('/api/profiles/:userId', authMiddleware_1.authMiddleware, profileController.getProfile);
app.put('/api/profiles/:userId', authMiddleware_1.authMiddleware, profileController.updateProfile);
// Posts
app.get('/api/posts', authMiddleware_1.authMiddleware, postController.getAllPosts);
app.post('/api/posts', authMiddleware_1.authMiddleware, postController.createPost);
app.get('/api/posts/:id', authMiddleware_1.authMiddleware, postController.getPost);
app.put('/api/posts/:id', authMiddleware_1.authMiddleware, postController.editPost);
app.delete('/api/posts/:id', authMiddleware_1.authMiddleware, postController.deletePost);
app.get('/api/users/:userId/posts', authMiddleware_1.authMiddleware, postController.getPostsByUser);
// Comments
app.get('/api/posts/:postId/comments', authMiddleware_1.authMiddleware, commentController.getComments);
app.post('/api/posts/:postId/comments', authMiddleware_1.authMiddleware, commentController.addComment);
app.put('/api/comments/:id', authMiddleware_1.authMiddleware, commentController.editComment);
app.delete('/api/comments/:id', authMiddleware_1.authMiddleware, commentController.deleteComment);
// Likes
app.post('/api/posts/:postId/like', authMiddleware_1.authMiddleware, likeController.likePost);
app.delete('/api/posts/:postId/like', authMiddleware_1.authMiddleware, likeController.unlikePost);
// Follow
app.post('/api/users/:id/follow', authMiddleware_1.authMiddleware, followController.follow);
app.delete('/api/users/:id/follow', authMiddleware_1.authMiddleware, followController.unfollow);
app.get('/api/users/:id/following', authMiddleware_1.authMiddleware, followController.checkFollowing);
// Feed
app.get('/api/feed', authMiddleware_1.authMiddleware, feedController.getFeed);
app.post('/api/feed/refresh', authMiddleware_1.authMiddleware, feedController.refreshFeed);
// Notifications
app.get('/api/notifications', authMiddleware_1.authMiddleware, notificationController.getNotifications);
app.put('/api/notifications/:id/read', authMiddleware_1.authMiddleware, notificationController.markAsRead);
// Messages
app.get('/api/messages', authMiddleware_1.authMiddleware, messageController.getConversationPartners);
app.post('/api/messages', authMiddleware_1.authMiddleware, messageController.sendMessage);
app.get('/api/messages/:userId', authMiddleware_1.authMiddleware, messageController.getConversation);
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
exports.default = app;
//# sourceMappingURL=app.js.map