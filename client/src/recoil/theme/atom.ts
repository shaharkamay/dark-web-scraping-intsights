import { atom } from 'recoil';

export const themeState = atom<string>({
  key: 'theme',
  default: localStorage.getItem('theme') || 'theme-auto',
});
