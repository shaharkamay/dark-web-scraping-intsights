import { Alert } from '@prisma/client';

const global: { countNewPastes: number; newAlerts: Alert[] } = {
  countNewPastes: 0,
  newAlerts: [],
};

// const alerts: {
//   pastes: {
//     count: number;
//     pastes: Paste[];
//     page: number;
//   };
// } = {
//   pastes: {
//     count: 0,
//     pastes: [],
//     page: 1,
//   },
// };
// const keywords: string[] = [];
// const keywordsLengthState = keywords.length; //0

export { global };
