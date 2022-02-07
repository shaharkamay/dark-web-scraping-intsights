import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { Paste } from '../../../@types';

const prisma = new PrismaClient();

const getPastes = async (page: null | number = null) => {
  const params: Prisma.pastesFindManyArgs = { take: 10 };
  if (page !== null) {
    params.skip = (page - 1) * (params.take || 10);
  }
  const pastes = await prisma.pastes.findMany(params);
  return pastes;
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

const countPages = async (perPage = 10) => {
  return Math.ceil((await prisma.pastes.count()) / perPage);
};

export default { getPastes, upsertPaste, upsertManyPastes, countPages };
