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
  // return await prisma.paste.createMany({ data: [...pas], skipDuplicates: true });
  for (const { entities, ...paste } of pastes) {
    if (entities) {
      const dbEntities = convertEntitiesToDb(entities, paste.id);
      for (const { values, ...entity } of dbEntities) {
        await prisma.entity.create({ data: entity });
        console.log(values);
      }
      // await prisma.entity.createMany({data: [...dbEntities], skipDuplicates: true});
    }
    console.log(paste);
    await prisma.paste.upsert({
      where: { id: paste.id },
      update: {},
      create: {
        ...paste,
      },
    });
  }
  return true;
};

// const extractEntities = (text: string): Concept[] => {
//   const entities = parse({ text, lang: 'en' });
//   return entities;
// };

export default { getPastes, upsertPaste, upsertManyPastes };
