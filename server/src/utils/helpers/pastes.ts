import { DefaultAuthor } from '../../@types';

const cropAuthorAndDate = (
  str: string | null | undefined
): { author: string; date: Date } => {
  if (str == null) return { author: '', date: new Date('Jan 01 1999') };
  const startAuthor = str.trim().replace('Posted by ', '');
  return {
    author: startAuthor.split(' at ')[0],
    date: new Date(startAuthor.split(' at ')[1]),
  };
};

const isDefaultAuthor = (author: string): boolean => {
  if (
    author === DefaultAuthor.Anonymous ||
    author === DefaultAuthor.Guest ||
    author === DefaultAuthor.Unknown
  )
    return true;

  return false;
};

export { cropAuthorAndDate, isDefaultAuthor };
