import { Alert, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAlerts = async () => {
  // return await prisma.alert.groupBy({ by: ['pasteId'], });
  const alerts = await prisma.alert.findMany({
    include: { keywords: true },
    orderBy: { date: 'desc' },
  });
  return alerts;
};

const getAlertsAfterDate = async (date: Date) => {
  const alerts = await prisma.alert.findMany({
    include: { keywords: true },
    orderBy: { date: 'desc' },
    where: { date: { gt: date } },
  });
  return alerts;
};

const insertAlerts = async (alerts: Omit<Alert, 'id'>[]) => {
  return await prisma.alert.createMany({ data: alerts });
};

const insertAlert = async (alert: Omit<Alert, 'id'>, keyword: string) => {
  return await prisma.alert.create({
    data: {
      ...alert,
      // keywords: { connectOrCreate: { where:{name_alertId:{name: keyword,}},create: { name: keyword } } },
      keywords: { create: { name: keyword } },
    },
  });
};

// const insertNewAlerts = async (pastes: Paste[]) => {
//   const alerts = await getAlerts();
//   for(const paste of pastes) {
//     await prisma.alert.create({data: {name: paste.title, pasteId: paste.id, keyword: {create:{name: ''}}} })

//   }
// }

export default { getAlerts, insertAlerts, insertAlert, getAlertsAfterDate };
