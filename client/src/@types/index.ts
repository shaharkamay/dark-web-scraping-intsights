import { ReactElement } from 'react';

export interface Paste {
  id: string;
  author: string;
  title: string;
  content: string;
  date: Date;
  entities: Entity[];
}

interface Entity {
  id: number;
  name: string;
  values: string;
  pasteId: string;
}

// export interface PasteWithEntities extends Paste {
//   entities?: Concept[];
// }

export interface PastesResponse {
  count: number;
  pastes: Paste[];
  page: number;
}

// interface Concept {
//   value?: string;
//   index: number;
//   lang: string;
//   atonicValue: string;
//   countWords: number;
// }

// export interface Entity {
//   start: number;
//   end: number;
//   type: string;
//   text: string;
// }

export interface IRoute {
  name: string;
  path: string;
  element: ReactElement | null;
}

export type HslString = `hsl(${number}, ${number}%, ${number}%)`;
