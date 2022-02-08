import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { Paste, PasteWithEntities } from '../../../@types';
import { Concept, parse } from 'concepts-parser';

const prisma = new PrismaClient();

const getPastes = async (
  page: null | number = null,
  query: null | string = null
) => {
  const params: Prisma.pastesFindManyArgs = { take: 10 };
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
  const count = await prisma.pastes.count({
    where: params.where,
  });
  const pastes = await prisma.pastes.findMany(params);

  const pastesWithEntities: PasteWithEntities[] = [...pastes];
  for (const paste of pastesWithEntities) {
    paste.entities = extractEntities(paste.content);
  }

  return { count, pastes: pastesWithEntities, page: page || 1 };
};

const upsertPaste = async (paste: Paste) => {
  const { id, ...rest } = paste;
  prisma.pastes.upsert({
    where: { id },
    update: { ...rest },
    create: { ...paste },
  });
};

const upsertManyPastes = async (
  pastes: Paste[]
): Promise<PrismaPromise<Prisma.BatchPayload>> => {
  return await prisma.pastes.createMany({ data: pastes, skipDuplicates: true });
};

const extractEntities = (text: string): Concept[] => {
  const entities = parse({ text, lang: 'en' });
  return entities;
};

export default { getPastes, upsertPaste, upsertManyPastes };
