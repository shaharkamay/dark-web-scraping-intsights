declare module 'ner' {
  interface NERParams {
    host: string;
    port: number;
  }

  export interface NERResponse {
    entities: Entities;
  }
  export interface Entities {
    [key: string]: string[];
  }

  type Callback = (err: Error, res: NERResponse) => void;

  class ner {
    constructor(params: ner.NERParams);
    get(text: string, callback: ner.Callback): void;
  }
  export = ner;
}
