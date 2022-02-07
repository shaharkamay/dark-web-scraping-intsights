import { atom } from 'recoil';

export const pagesState = atom<{ current: number; numPages: number }>({
  key: 'pages',
  default: {
    current: 1,
    numPages: 2,
  },
});
