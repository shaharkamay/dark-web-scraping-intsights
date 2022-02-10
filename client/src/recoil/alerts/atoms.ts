import { atom } from 'recoil';
import { PastesResponse } from '../../@types';

export const alertsState = atom<PastesResponse>({
  key: 'alerts',
  default: {
    count: 0,
    pastes: [],
    page: 1,
  },
});
