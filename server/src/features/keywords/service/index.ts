import { Keyword, PrismaClient } from '@prisma/client';
import alertsService from '../../alerts/service';
import pastesService from '../../pastes/service';

const prisma = new PrismaClient();

const getKeywords = async () => {
  return await prisma.keyword.groupBy({ by: ['name'] });
};

const insertKeyword = async (keyword: string) => {
  const pastes = await pastesService.db.searchMultipleQueries([keyword]);
  for (const paste of pastes.pastes) {
    await alertsService.insertAlert(
      {
        name: paste.title,
        pasteId: paste.id,
      },
      keyword
    );
  }
  return true;
};

const insertKeywords = async (keywords: Omit<Keyword, 'id'>[]) => {
  await prisma.keyword.createMany({ data: keywords });
};

const deleteKeyword = async (keyword: string) => {
  await prisma.alert.deleteMany({ where: { keyword: { name: keyword } } });
  await prisma.keyword.deleteMany({ where: { name: keyword } });
  // await prisma.keyword.delete({
  //   where: { name_alertId: { name: keyword, alertId } },
  // });
};

export default { getKeywords, insertKeyword, insertKeywords, deleteKeyword };
