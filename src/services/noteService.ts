import axios from "axios";
import type { Note, NewNote } from "../types/note";
const BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNoteParams {
  search?: string;
  page?: number;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  total: number;
}

export async function fetchNotes({
  search,
  page = 1,
  perPage = 10,
}: FetchNoteParams): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params: { search, page, perPage },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
