import { Keyword, PrismaClient } from '@prisma/client';
// import alertsService from '../../alerts/service';
import pastesService from '../../pastes/service';

const prisma = new PrismaClient();

const getKeywords = async () => {
  return await prisma.keyword.findMany();
};

const getKeywordsGroupByName = async () => {
  return await prisma.keyword.groupBy({
    by: ['name'],
    orderBy: { name: 'asc' },
  });
};

const insertKeyword = async (keyword: string | Keyword) => {
  // return await prisma.keyword.create({data: {name:keyword, alert}})
  const keywordQuery = typeof keyword === 'string' ? keyword : keyword.name;
  const pastes = await pastesService.db.searchMultipleQueries([keywordQuery]);
  // console.log(pastes);
  for (const paste of pastes.pastes) {
    await prisma.keyword.create({
      data: {
        name: keywordQuery,
        alert: {
          connectOrCreate: {
            where: { name_pasteId: { name: paste.title, pasteId: paste.id } },
            create: { name: paste.title, pasteId: paste.id },
          },
        },
      },
    });
    // const alert = await alertsService.insertAlert(
    //   {
    //     name: paste.title,
    //     pasteId: paste.id,
    //   },
    //   keyword
    // );
    // console.log(alert);
  }
  return true;
};

const insertKeywords = async (keywords: Omit<Keyword, 'id'>[]) => {
  await prisma.keyword.createMany({ data: keywords });
};

const deleteKeyword = async (keyword: string) => {
  await prisma.alert.deleteMany({
    where: { keywords: { every: { name: keyword } } },
  });
  return await prisma.keyword.deleteMany({ where: { name: keyword } });
};

const upsertKeywords = async () => {
  let count = 0;
  const keywords = await getKeywordsGroupByName();
  for (const keyword of keywords) {
    try {
      console.log(await insertKeyword(keyword.name));
      count++;
    } catch (error) {
      console.log(error);
    }
  }
  return count;
  // const pastes = await pastesService.db.searchMultipleQueries(
  //   keywords.map((keyword) => keyword.name)
  // );
  // return pastes;
};

export default {
  getKeywords,
  insertKeyword,
  insertKeywords,
  deleteKeyword,
  upsertKeywords,
  getKeywordsGroupByName,
};
