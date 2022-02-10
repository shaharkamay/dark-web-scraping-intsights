import { Entity } from '@prisma/client';
import { Entities } from 'ner';
import { DefaultAuthor } from '../../@types';

const cropAuthorAndDate = (
  str: string | null | undefined
): { author: string; date: Date } => {
  if (str == null) return { author: '', date: new Date('Jan 01 1999') };
  const startAuthor = str.trim().replace('Posted by ', '');
  return {
    author: startAuthor.split(' at ')[0],
    date: new Date(startAuthor.split(' at ')[1]),
  };
};

const isDefaultAuthor = (author: string): boolean => {
  if (
    author === DefaultAuthor.Anonymous ||
    author === DefaultAuthor.Guest ||
    author === DefaultAuthor.Unknown
  )
    return true;

  return false;
};

interface EntityWithValues extends Omit<Entity, 'id'> {
  values: string[];
}

const convertEntitiesToDb = (
  entities: Entities,
  pasteId: string
): EntityWithValues[] => {
  const dbEntities: EntityWithValues[] = [];
  for (const name in entities) {
    dbEntities.push({ name, pasteId, values: entities[name] });
  }
  return dbEntities;
};

// {
//   return Object.keys(entities || {}).map((key) => {
//     return {
//       where: { id: entities[key] },
//       create: { name: key, value: entities[key] },
//     };
//   }),
// }

export { cropAuthorAndDate, isDefaultAuthor, convertEntitiesToDb };
