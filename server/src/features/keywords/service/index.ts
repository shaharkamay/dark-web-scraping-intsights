import { keywords } from '../../../utils/globals';

const addKeyword = (keyword: string) => {
  if (!keywords.includes(keyword)) {
    keywords.push(keyword);
  }
};

export default { addKeyword };
