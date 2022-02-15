import { Prisma, PrismaClient } from '@prisma/client';
import { ProxyHandler } from 'aws-lambda';

const prisma = new PrismaClient();

export const handler: ProxyHandler = async (event) => {
  const page = Number(event.queryStringParameters?.page) || null;
  const query = event.queryStringParameters?.query || null;

  const pastes = await getPastes(page, query);

  return {
    statusCode: 200,
    body: JSON.stringify(pastes),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
    },
  };
};

const getPastes = async (
  page: null | number = null,
  query: null | string = null
) => {
  const params: Prisma.PasteFindManyArgs = {
    take: 10,
    orderBy: { date: 'desc' },
  };
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

  return { count, pastes, page: page || 1 };
};
