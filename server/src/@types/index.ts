export interface Paste {
  id: string;
  author: string;
  title: string;
  content: string;
  date: string;
}

export enum DefaultAuthor {
  Anonymous = 'Anonymous',
  Guest = 'Guest',
  Unknown = 'Unknown',
}
