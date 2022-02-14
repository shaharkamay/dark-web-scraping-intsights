import { Keyword, Prisma, PrismaClient } from '@prisma/client';
import { ProxyHandler } from 'aws-lambda';

const prisma = new PrismaClient();

export const handler: ProxyHandler = async () => {
  await upsertKeywords();

  return {
    statusCode: 200,
    body: JSON.stringify('upsert successfully'),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
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
};

const insertKeyword = async (keyword: string | Keyword) => {
  // return await prisma.keyword.create({data: {name:keyword, alert}})
  const keywordQuery = typeof keyword === 'string' ? keyword : keyword.name;
  const pastes = await searchMultipleQueries([keywordQuery]);
  if (pastes.pastes.length === 0)
    await prisma.keyword.create({ data: { name: keywordQuery, alertId: 0 } });
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
  }
  return true;
};

const getKeywordsGroupByName = async () => {
  return await prisma.keyword.groupBy({
    by: ['name'],
    orderBy: { name: 'asc' },
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
