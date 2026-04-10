import express from 'express';
import cors from 'cors';

// Services
import { UserService } from './services/UserService';
import { ProfileService } from './services/ProfileService';
import { PostService } from './services/PostService';
import { CommentService } from './services/CommentService';
import { LikeService } from './services/LikeService';
import { FollowService } from './services/FollowService';
import { FeedService } from './services/FeedService';
import { NotificationService } from './services/NotificationService';
import { MessageService } from './services/MessageService';

// Controllers
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { ProfileController } from './controllers/ProfileController';
import { PostController } from './controllers/PostController';
import { CommentController } from './controllers/CommentController';
import { LikeController } from './controllers/LikeController';
import { FollowController } from './controllers/FollowController';
import { FeedController } from './controllers/FeedController';
import { NotificationController } from './controllers/NotificationController';
import { MessageController } from './controllers/MessageController';

// Middleware
import { authMiddleware } from './middleware/authMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

// ─── Dependency Injection ────────────────────────────────────────
const userService = new UserService();
const notificationService = new NotificationService();
const followService = new FollowService(notificationService);
const postService = new PostService();
const commentService = new CommentService(postService, notificationService);
const likeService = new LikeService(postService, notificationService);
const feedService = new FeedService(postService, followService);
const profileService = new ProfileService(userService);
const messageService = new MessageService();

// ─── Controllers ────────────────────────────────────────────────
const authController = new AuthController(userService);
const userController = new UserController(userService, followService);
const profileController = new ProfileController(profileService);
const postController = new PostController(postService, likeService);
const commentController = new CommentController(commentService);
const likeController = new LikeController(likeService);
const followController = new FollowController(followService);
const feedController = new FeedController(feedService, postService, likeService);
const notificationController = new NotificationController(notificationService);
const messageController = new MessageController(messageService, userService);

// ─── Routes ─────────────────────────────────────────────────────

// Auth (public)
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.post('/api/auth/logout', authController.logout);
app.get('/api/auth/me', authMiddleware, authController.getMe);

// Users
app.get('/api/users', authMiddleware, userController.getAllUsers);
app.get('/api/users/:id', authMiddleware, userController.getUser);
app.put('/api/users/:id', authMiddleware, userController.updateAccount);
app.delete('/api/users/:id', authMiddleware, userController.deleteAccount);

// Profiles
app.get('/api/profiles/:userId', authMiddleware, profileController.getProfile);
app.put('/api/profiles/:userId', authMiddleware, profileController.updateProfile);

// Posts
app.get('/api/posts', authMiddleware, postController.getAllPosts);
app.post('/api/posts', authMiddleware, postController.createPost);
app.get('/api/posts/:id', authMiddleware, postController.getPost);
app.put('/api/posts/:id', authMiddleware, postController.editPost);
app.delete('/api/posts/:id', authMiddleware, postController.deletePost);
app.get('/api/users/:userId/posts', authMiddleware, postController.getPostsByUser);

// Comments
app.get('/api/posts/:postId/comments', authMiddleware, commentController.getComments);
app.post('/api/posts/:postId/comments', authMiddleware, commentController.addComment);
app.put('/api/comments/:id', authMiddleware, commentController.editComment);
app.delete('/api/comments/:id', authMiddleware, commentController.deleteComment);

// Likes
app.post('/api/posts/:postId/like', authMiddleware, likeController.likePost);
app.delete('/api/posts/:postId/like', authMiddleware, likeController.unlikePost);

// Follow
app.post('/api/users/:id/follow', authMiddleware, followController.follow);
app.delete('/api/users/:id/follow', authMiddleware, followController.unfollow);
app.get('/api/users/:id/following', authMiddleware, followController.checkFollowing);

// Feed
app.get('/api/feed', authMiddleware, feedController.getFeed);
app.post('/api/feed/refresh', authMiddleware, feedController.refreshFeed);

// Notifications
app.get('/api/notifications', authMiddleware, notificationController.getNotifications);
app.put('/api/notifications/:id/read', authMiddleware, notificationController.markAsRead);

// Messages
app.get('/api/messages', authMiddleware, messageController.getConversationPartners);
app.post('/api/messages', authMiddleware, messageController.sendMessage);
app.get('/api/messages/:userId', authMiddleware, messageController.getConversation);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

export default app;
