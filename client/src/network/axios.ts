import axios from 'axios';
import { Paste } from '../@types';

const BASE_URL = 'api/';

export const getPastes = async (page = 1, query: string | null = null) => {
  const res = await axios.get<{ count: number; pastes: Paste[] }>(
    `${BASE_URL}pastes?page=${page}${query ? `&query=${query}` : ''}`
  );
  return res.data;
};
