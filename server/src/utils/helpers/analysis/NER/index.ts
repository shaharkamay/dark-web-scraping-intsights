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
        // const data: string[] = [];
        // for (const ent in res.entities) {
        //   if (res.entities[ent]) {
        //     (res.entities[ent] as string[]).forEach((entity) => {
        //       data.push(entity);
        //     });
        //   }
        // }
        resolve(res.entities);
      }
    });
  });
}
