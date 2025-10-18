import { api } from './api';
import { Note, CreateNoteData, NotesResponse, NoteSearchParams } from '@/types/note'; // Не імпортуйте UpdateNoteData
import { User } from '@/types/user';
// Аутентифікація
export const register = async (userData: { email: string; password: string }): Promise<User> => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials: { email: string; password: string }): Promise<User> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const response = await api.get('/auth/session');
    return response.data || null;
  } catch (error) {
    return null;
  }
};

// Користувачі
export const getMe = async (): Promise<User> => {
  const response = await api.get('/users/me');
  return response.data;
};

export const updateMe = async (userData: Partial<User>): Promise<User> => {
  const response = await api.patch('/users/me', userData);
  return response.data;
};