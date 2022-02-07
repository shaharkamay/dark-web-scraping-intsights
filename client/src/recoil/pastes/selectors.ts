import { selector } from 'recoil';
import { Paste } from '../../@types';
import { getPastes } from '../../network/axios';
import { pagesState } from './atoms';

export const currentPastesQuery = selector<{ count: number; pastes: Paste[] }>({
  key: 'CurrentPastes',
  get: async ({ get }) => {
    const pastes = await getPastes(get(pagesState).current);
    return pastes;
  },
});

// export const currentPastesQueryWithQuery = selector<{ count: number; pastes: Paste[] }>({
//   key: 'CurrentPastes',
//   get: async ({ get }) => {
//     const pastes = await getPastes(get(pagesState).current, );
//     return pastes;
//   },
// });
