import { Entity, Paste, Prisma, PrismaClient } from '@prisma/client';
import { ProxyHandler } from 'aws-lambda';

const prisma = new PrismaClient();

export const handler: ProxyHandler = async (event) => {
  console.log(event);
  const pastes = event.body ? JSON.parse(event.body).pastes || [] : [];

  const newPastesCount = (await upsertManyPastes(pastes)).count;

  return {
    statusCode: 200,
    body: JSON.stringify(newPastesCount),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
    },
  };
};

interface PasteWithEntities extends Paste {
  entities: Entities;
}

interface Entities {
  [key: string]: string[];
}

const upsertManyPastes = async (pastes: PasteWithEntities[]) => {
  const pastesWithoutEntities: Omit<PasteWithEntities, 'entities'>[] = [];
  for (const { entities, ...paste } of pastes) {
    pastesWithoutEntities.push(paste);
    if (entities) {
      const dbEntities = convertEntitiesToDb(entities, paste.id);

      await prisma.entity.createMany({
        data: dbEntities,
        skipDuplicates: true,
      });
    }
  }
  return await prisma.paste.createMany({
    data: pastesWithoutEntities,
    skipDuplicates: true,
  });
};

const convertEntitiesToDb = (
  entities: Entities,
  pasteId: string
): Omit<Entity, 'id'>[] => {
  const dbEntities: Omit<Entity, 'id'>[] = [];
  for (const name in entities) {
    dbEntities.push({ name, pasteId, values: entities[name].join(',') });
  }
  return dbEntities;
};
