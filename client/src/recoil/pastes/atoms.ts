import { atom } from 'recoil';
import { PastesResponse } from '../../@types';

export const queryState = atom({
  key: 'query',
  default: '',
});

export const pastesState = atom<PastesResponse>({
  key: 'pastes',
  default: {
    count: 0,
    pastes: [],
    page: 1,
  },
});

export const isPastesLoadingState = atom<boolean>({
  key: 'isPastesLoading',
  default: false,
});
