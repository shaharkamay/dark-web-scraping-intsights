export enum DefaultAuthor {
  Anonymous = 'Anonymous',
  Guest = 'Guest',
  Unknown = 'Unknown',
}

interface Paste {
  id: string;
  author: string;
  title: string;
  content: string;
  date: Date;
}

export interface PasteWithEntities extends Paste {
  entities?: Entities;
}

export interface Entities {
  [key: string]: string[];
}
