export interface Paste {
  id: string;
  author: string;
  title: string;
  content: string;
  date: Date;
}

export interface PasteWithEntities extends Paste {
  entities?: Concept[];
}

export interface PastesResponse {
  count: number;
  pastes: PasteWithEntities[];
  page: number;
}

interface Concept {
  value?: string;
  index: number;
  lang: string;
  atonicValue: string;
  countWords: number;
}

export interface Entity {
  start: number;
  end: number;
  type: string;
  text: string;
}

export type HslString = `hsl(${number}, ${number}%, ${number}%)`;
