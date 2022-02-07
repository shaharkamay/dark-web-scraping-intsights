import debounce from 'lodash.debounce';
import { getPastes } from './axios';
import { Paste as IPaste } from '../@types';

const fetchPastes = async (
  query: string,
  cb: ({ count, pastes }: { count: number; pastes: IPaste[] }) => void
) => {
  const res = await getPastes(1, query);
  cb(res);
};

const debouncedFetchData = debounce((query, cb) => {
  fetchPastes(query, cb);
}, 700);

export { fetchPastes, debouncedFetchData };
