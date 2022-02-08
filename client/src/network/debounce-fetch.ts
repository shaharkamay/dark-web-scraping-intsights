import debounce from 'lodash.debounce';
import { getPastes } from './axios';
import { PastesResponse } from '../@types';

const fetchPastes = async (
  query: string,
  page: number,
  cb: ({ count, pastes, page }: PastesResponse) => void
) => {
  const res = await getPastes(page, query);
  cb(res);
};

const debouncedFetchData = debounce((query, page, cb) => {
  fetchPastes(query, page, cb);
}, 700);

export { fetchPastes, debouncedFetchData };
