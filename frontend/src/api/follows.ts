import api from './client';

export const followUser = (id: string) => api.post(`/users/${id}/follow`);
export const unfollowUser = (id: string) => api.delete(`/users/${id}/follow`);
export const checkFollowing = (id: string) => api.get(`/users/${id}/following`);
