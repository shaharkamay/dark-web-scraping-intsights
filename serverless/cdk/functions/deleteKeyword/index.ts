import { Prisma, PrismaClient } from '@prisma/client';
import { ProxyHandler } from 'aws-lambda';

const prisma = new PrismaClient();

export const handler: ProxyHandler = async (event) => {
  const keyword = event.queryStringParameters?.keyword || '';

  const count = (await deleteKeyword(keyword)).count;

  return {
    statusCode: 200,
    body: count.toString(),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
    },
  };
};

const deleteKeyword = async (keyword: string) => {
  await prisma.alert.deleteMany({
    where: { keywords: { every: { name: keyword } } },
  });
  return await prisma.keyword.deleteMany({ where: { name: keyword } });
};
