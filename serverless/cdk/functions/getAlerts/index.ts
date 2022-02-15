import { Prisma, PrismaClient } from '@prisma/client';
import { ProxyHandler } from 'aws-lambda';

const prisma = new PrismaClient();

export const handler: ProxyHandler = async (event) => {
  const date = event.queryStringParameters?.date
    ? new Date(event.queryStringParameters.date)
    : null;

  const alerts = await getAlerts(date);
  console.log(alerts.length);
  return {
    statusCode: 200,
    body: JSON.stringify(alerts),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
    },
  };
};

const getAlerts = async (fromDate: Date | null = null) => {
  const params: Prisma.AlertFindManyArgs = {
    include: { keywords: true },
    orderBy: { date: 'desc' },
  };

  if (fromDate) params.where = { date: { gte: fromDate } };

  const alerts = await prisma.alert.findMany(params);
  return alerts;
};
