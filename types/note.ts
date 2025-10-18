export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  tag?: string;
}

export interface NotesResponse {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
}

export interface NoteSearchParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}