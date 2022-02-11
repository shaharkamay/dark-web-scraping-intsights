import { Alert, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAlerts = async () => {
  // return await prisma.alert.groupBy({ by: ['pasteId'], });
  const alerts = await prisma.alert.findMany({ include: { keyword: true } });
  return alerts;
};

const insertAlerts = async (alerts: Omit<Alert, 'id'>[]) => {
  return await prisma.alert.createMany({ data: alerts });
};

const insertAlert = async (alert: Omit<Alert, 'id'>, keyword: string) => {
  return await prisma.alert.create({
    data: { ...alert, keyword: { create: { name: keyword } } },
  });
};

export default { getAlerts, insertAlerts, insertAlert };
