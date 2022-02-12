import { atom } from 'recoil';

export const alertsNotificationState = atom<Date>({
  key: 'alerts',
  default: new Date(),
});
