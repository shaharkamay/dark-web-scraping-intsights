import NER, { Entities, NERResponse } from 'ner';
import config from './utils/config';

const client = new NER(config.stanfordServer);
console.log(client);

function NERQuery(text: string): Promise<Entities> {
  return new Promise((resolve, reject) => {
    client.get(text, (err: Error, res: NERResponse) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.entities);
      }
    });
  });
}

export default { NERQuery };
