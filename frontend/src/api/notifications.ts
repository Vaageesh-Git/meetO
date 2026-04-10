import api from './client';

export const getNotifications = () => api.get('/notifications');
export const markAsRead = (id: string) => api.put(`/notifications/${id}/read`);
