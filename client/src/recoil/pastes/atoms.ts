import { atom } from 'recoil';
import { Paste } from '../../@types';

export const pagesState = atom<{ current: number; numPages: number }>({
  key: 'pages',
  default: {
    current: 1,
    numPages: 2,
  },
});

export const queryState = atom({
  key: 'query',
  default: '',
});

export const pastesState = atom<{ count: number; pastes: Paste[] }>({
  key: 'pastes',
  default: {
    count: 0,
    pastes: [],
  },
});

export const isPastesLoadingState = atom<boolean>({
  key: 'isPastesLoading',
  default: false,
});
