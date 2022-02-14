export interface Alert {
  id: number;
  name: string;
  pasteId: string;
  date: Date;
}

export interface Paste {
  id: string;
  author: string;
  title: string;
  content: string;
  date: Date;
}

export interface PastesResponse {
  count: number;
  pastes: Paste[];
  page: number;
}
