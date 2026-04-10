import api from './client';

export const getFeed = () => api.get('/feed');
export const refreshFeed = () => api.post('/feed/refresh');
export const getAllPosts = () => api.get('/posts');
export const getPost = (id: string) => api.get(`/posts/${id}`);
export const createPost = (data: { content: string; imageUrl?: string }) =>
  api.post('/posts', data);
export const editPost = (id: string, data: { content: string; imageUrl?: string }) =>
  api.put(`/posts/${id}`, data);
export const deletePost = (id: string) => api.delete(`/posts/${id}`);

export const getComments = (postId: string) => api.get(`/posts/${postId}/comments`);
export const addComment = (postId: string, content: string) =>
  api.post(`/posts/${postId}/comments`, { content });
export const editComment = (commentId: string, content: string) =>
  api.put(`/comments/${commentId}`, { content });
export const deleteComment = (commentId: string) =>
  api.delete(`/comments/${commentId}`);

export const likePost = (postId: string) => api.post(`/posts/${postId}/like`);
export const unlikePost = (postId: string) => api.delete(`/posts/${postId}/like`);
