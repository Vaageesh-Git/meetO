import api from './client';

export const getConversationPartners = () => api.get('/messages');
export const sendMessage = (receiverId: string, content: string) =>
  api.post('/messages', { receiverId, content });
export const getConversation = (userId: string) => api.get(`/messages/${userId}`);
