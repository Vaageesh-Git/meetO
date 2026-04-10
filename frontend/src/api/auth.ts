import api from './client';

export const register = (username: string, email: string, password: string) =>
  api.post('/auth/register', { username, email, password });

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const logout = () => api.post('/auth/logout');
export const getMe = () => api.get('/auth/me');
