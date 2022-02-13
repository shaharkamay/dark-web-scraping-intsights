import NER, { Entities, NERResponse } from 'ner';
import config from '../../../config';

const client = new NER(config.NER_SERVER);
console.log(client);

export default function NERQuery(text: string): Promise<Entities> {
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
