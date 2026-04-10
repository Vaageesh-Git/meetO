import api from './client';

export const getAllUsers = () => api.get('/users');
export const getUser = (id: string) => api.get(`/users/${id}`);
export const updateAccount = (id: string, data: { username?: string; email?: string }) =>
  api.put(`/users/${id}`, data);
export const deleteAccount = (id: string) => api.delete(`/users/${id}`);
export const getProfile = (userId: string) => api.get(`/profiles/${userId}`);
export const updateProfile = (userId: string, data: { bio?: string; avatarUrl?: string }) =>
  api.put(`/profiles/${userId}`, data);
export const getUserPosts = (userId: string) => api.get(`/users/${userId}/posts`);
