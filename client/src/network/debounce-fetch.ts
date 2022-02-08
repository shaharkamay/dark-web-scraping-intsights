import debounce from 'lodash.debounce';
import { getPastes } from './axios';
import { Paste as IPaste } from '../@types';

const fetchPastes = async (
  query: string,
  page: number,
  cb: ({ count, pastes }: { count: number; pastes: IPaste[] }) => void
) => {
  const res = await getPastes(page, query);
  cb(res);
};

const debouncedFetchData = debounce((query, page, cb) => {
  fetchPastes(query, page, cb);
}, 700);

export { fetchPastes, debouncedFetchData };
