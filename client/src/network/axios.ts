import axios from 'axios';
import { PastesResponse } from '../@types';

const BASE_URL = 'api/';

export const getPastes = async (page = 1, query: string | null = null) => {
  try {
    const res = await axios.get<PastesResponse>(
      `${BASE_URL}pastes?page=${page}${query ? `&query=${query}` : ''}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { count: 0, pastes: [], page: 1 };
  }
};
