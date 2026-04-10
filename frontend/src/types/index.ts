// Shared TypeScript types used across frontend
export const __types = true;

export interface User {
  id: string;
  username: string;
  email: string;
  profileId: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  bio: string;
  avatarUrl: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
  liked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  actorId: string;
  type: 'like' | 'comment' | 'follow';
  targetId: string;
  isRead: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

export interface UserWithProfile extends User {
  profile?: Profile;
  followingCount?: number;
  followersCount?: number;
  isFollowing?: boolean;
}
