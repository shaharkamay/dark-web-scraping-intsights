import { Paste } from '../../@types';

const countNewPastes: { count: number } = {
  count: 0,
};

const alerts: {
  pastes: {
    count: number;
    pastes: Paste[];
    page: number;
  };
} = {
  pastes: {
    count: 0,
    pastes: [],
    page: 1,
  },
};
const keywords: string[] = [];
const keywordsLengthState = keywords.length; //0

export { countNewPastes, alerts, keywords, keywordsLengthState };
