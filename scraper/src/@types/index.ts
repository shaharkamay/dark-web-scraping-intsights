import { Paste } from '@prisma/client';

export enum DefaultAuthor {
  Anonymous = 'Anonymous',
  Guest = 'Guest',
  Unknown = 'Unknown',
}

export interface PasteWithEntities extends Paste {
  entities?: Entities;
}

export interface Entities {
  [key: string]: string[];
}
