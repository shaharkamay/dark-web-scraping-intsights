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

export interface PastesResponse {
  count: number;
  pastes: Paste[];
  page: number;
}

export interface IRoute {
  name: string;
  path: string;
}

export interface Keyword {
  id: number;
  name: string;
  alertId: number;
}

export interface Alert {
  id: number;
  name: string;
  keywords: Keyword[];
  date: Date;
}

export type HslString = `hsl(${number}, ${number}%, ${number}%)`;
