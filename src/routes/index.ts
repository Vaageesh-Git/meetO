import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { PostController } from "../controllers/PostController";
import { FeedController } from "../controllers/FeedController";
import { UserController } from "../controllers/UserController";

const router = Router();

// Auth Routes
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

// Post Routes
router.post("/posts", PostController.createPost);
router.post("/posts/:postId/comments", PostController.addComment);
router.post("/posts/:postId/like", PostController.likePost);

// Feed Route
router.get("/feed", FeedController.getFeed);

// User & Notification Routes
router.post("/users/follow", UserController.followUser);
router.get("/users/:userId/notifications", UserController.getNotifications);

export { router as routes };
