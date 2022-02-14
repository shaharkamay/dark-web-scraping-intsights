import { Prisma, PrismaClient } from '@prisma/client';
import { ProxyHandler } from 'aws-lambda';

const prisma = new PrismaClient();

export const handler: ProxyHandler = async (event) => {
  const keyword = event.queryStringParameters?.keyword || '';

  const count = (await deleteKeyword(keyword)).count;

  return {
    statusCode: 204,
    body: JSON.stringify(count),
  };
};

const deleteKeyword = async (keyword: string) => {
  await prisma.alert.deleteMany({
    where: { keywords: { every: { name: keyword } } },
  });
  return await prisma.keyword.deleteMany({ where: { name: keyword } });
};
