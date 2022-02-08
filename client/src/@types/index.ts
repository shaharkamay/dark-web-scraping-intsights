export interface Paste {
  id: string;
  author: string;
  title: string;
  content: string;
  date: Date;
}

interface Concept {
  value?: string;
  index: number;
  lang: string;
  atonicValue: string;
  countWords: number;
}

export interface PasteWithEntities extends Paste {
  entities?: Concept[];
}

export interface Entity {
  start: number;
  end: number;
  type: string;
  text: string;
}
