import { Prisma, PrismaClient } from '@prisma/client';
import { Paste } from '../../../@types';
import { convertEntitiesToDb } from '../../../utils/helpers/pastes';
// import { Concept, parse } from 'concepts-parser';

const prisma = new PrismaClient();

const getPastes = async (
  page: null | number = null,
  query: null | string = null
) => {
  const params: Prisma.PasteFindManyArgs = { take: 10 };
  if (page !== null) params.skip = (page - 1) * (params.take || 10);
  if (query !== null)
    params.where = {
      OR: [
        {
          content: {
            contains: query,
          },
        },
        {
          author: {
            contains: query,
          },
        },
        {
          title: {
            contains: query,
          },
        },
      ],
    };
  params.include = {
    entities: true,
  };
  const count = await prisma.paste.count({
    where: params.where,
  });
  const pastes = await prisma.paste.findMany(params);

  // const pastesWithEntities: PasteWithEntities[] = [...pastes];
  // for (const paste of pastesWithEntities) {
  //   paste.entities = extractEntities(paste.content);
  // }

  return { count, pastes, page: page || 1 };
};

const upsertPaste = async (paste: Paste) => {
  const { id, ...rest } = paste;
  prisma.paste.upsert({
    where: { id },
    update: { ...rest },
    create: { ...paste },
  });
};

const upsertManyPastes = async (pastes: Paste[]) => {
  const pastesWithoutEntities: Omit<Paste, 'entities'>[] = [];
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

const searchMultipleQueries = async (queries: string[]) => {
  const params: Prisma.PasteFindManyArgs = {};
  if (queries.length) {
    params.where = {
      OR: queries.map((query) => {
        return {
          content: {
            contains: query,
          },
        };
      }),
    };
    params.where.OR = [
      ...(params.where.OR as []),
      ...queries.map((query) => {
        return {
          title: {
            contains: query,
          },
        };
      }),
    ];
  }
  params.include = {
    entities: true,
  };
  const count = await prisma.paste.count({
    where: params.where,
  });
  const pastes = await prisma.paste.findMany(params);

  return { count, pastes, page: 1 };
};

export default {
  getPastes,
  upsertPaste,
  upsertManyPastes,
  searchMultipleQueries,
};
