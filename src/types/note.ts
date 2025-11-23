export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface Note {
  content: string;
  craetedAt: string;
  id: string;
  tag: NoteTag;
  title: string;
  updateAt: string;
}

export interface NewTag {
  title: string;
  content?: string;
  tag: NoteTag;
}
