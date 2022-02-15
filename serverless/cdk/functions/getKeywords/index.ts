import { Prisma, PrismaClient } from '@prisma/client';
import { ProxyHandler } from 'aws-lambda';

const prisma = new PrismaClient();

export const handler: ProxyHandler = async () => {
  const keywords = await getKeywordsGroupByName();

  return {
    statusCode: 200,
    body: JSON.stringify(keywords),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
    },
  };
};

const getKeywordsGroupByName = async () => {
  return await prisma.keyword.groupBy({
    by: ['name'],
    orderBy: { name: 'asc' },
  });
};
