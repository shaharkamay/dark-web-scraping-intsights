import { polarity } from 'polarity';

export const getHslByAnalyzedWord = (word: string) => {
  const number = polarity([word], {}).polarity;
  const h = (number + 5) * 12;
  return `hsl(${h}, 100%, 50%)`;
};
