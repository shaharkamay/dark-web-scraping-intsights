import { DefaultAuthor } from '../../@types';

function withTimeoutPromise<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(`Timed out after ${ms} ms.`), ms)
  );
  return Promise.race<T>([promise, timeout]);
}

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

export { withTimeoutPromise, cropAuthorAndDate, isDefaultAuthor };
