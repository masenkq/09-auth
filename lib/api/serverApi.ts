import { headers } from 'next/headers';
import { Note, NotesResponse, NoteSearchParams } from '@/types/note';
import { User } from '@/types/user';

const BASE_URL = 'https://notehub-api.goit.study';

// Допоміжна функція для отримання заголовків з cookies
const getServerHeaders = async () => {
  const headersList = await headers();
  const cookie = headersList.get('cookie');
  
  return {
    'Content-Type': 'application/json',
    ...(cookie && { Cookie: cookie }),
  };
};

// Нотатки
export const fetchNotes = async (params?: NoteSearchParams): Promise<NotesResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.search) queryParams.append('search', params.search);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.perPage) queryParams.append('perPage', params.perPage.toString());
  if (params?.tag) queryParams.append('tag', params.tag);

  const headers = await getServerHeaders();

  const response = await fetch(`${BASE_URL}/notes?${queryParams}`, {
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.statusText}`);
  }

  return response.json();
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getServerHeaders();

  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch note: ${response.statusText}`);
  }

  return response.json();
};

// Аутентифікація
export const checkSession = async (): Promise<User | null> => {
  try {
    const headers = await getServerHeaders();

    const response = await fetch(`${BASE_URL}/auth/session`, {
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    return null;
  }
};

// Користувачі
export const getMe = async (): Promise<User> => {
  const headers = await getServerHeaders();

  const response = await fetch(`${BASE_URL}/users/me`, {
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  return response.json();
};