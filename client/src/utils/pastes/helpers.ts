import { polarity } from 'polarity';
import { HslString } from '../../@types';

export const getHslByAnalyzedWord = (word: string): HslString => {
  const number = polarity([word], {}).polarity;
  const h = (number + 5) * 12;
  return `hsl(${h}, 100%, 50%)`;
};
