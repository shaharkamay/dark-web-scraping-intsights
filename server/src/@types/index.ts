// import { Concept } from 'concepts-parser';
import { Alert } from '@prisma/client';
import { Entities } from 'ner';

export interface Paste {
  id: string;
  author: string;
  title: string;
  content: string;
  date: Date;
  entities?: Entities;
}

// export interface PasteWithEntities extends Paste {
//   entities?: Concept[];
// }

export enum DefaultAuthor {
  Anonymous = 'Anonymous',
  Guest = 'Guest',
  Unknown = 'Unknown',
}

export interface AlertWithKeyword extends Alert {
  keyword: { create: { name: string } };
}
