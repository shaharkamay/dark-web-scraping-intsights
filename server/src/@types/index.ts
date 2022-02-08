import { Concept } from 'concepts-parser';

export interface Paste {
  id: string;
  author: string;
  title: string;
  content: string;
  date: Date;
}

// export interface Concept {
//   _fields: {
//     value: string;
//     index: number;
//     lang: string;
//     atonicValue: string;
//     countWords: number;
//   };
// }

export interface PasteWithEntities extends Paste {
  entities?: Concept[];
}

export enum DefaultAuthor {
  Anonymous = 'Anonymous',
  Guest = 'Guest',
  Unknown = 'Unknown',
}
