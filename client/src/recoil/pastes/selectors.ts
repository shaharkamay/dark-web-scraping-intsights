import { selector } from 'recoil';
import { Paste } from '../../@types';
import { getNumPages, getPastes } from '../../network/axios';
import { pagesState } from './atoms';

export const currentPastesQuery = selector<Paste[]>({
  key: 'CurrentPastes',
  get: async ({ get }) => {
    const pastes = await getPastes(get(pagesState).current);
    return pastes;
  },
});

export const numPagesQuery = selector<number>({
  key: 'NumPages',
  get: async () => {
    const numPages = await getNumPages();
    return numPages;
  },
});
