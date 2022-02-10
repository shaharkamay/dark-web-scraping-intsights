import axios from 'axios';
import { PastesResponse } from '../@types';

export const BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8081/api/'
    : 'api/';

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

export const sendKeyword = async (keyword: string) => {
  try {
    const res = await axios.post(`${BASE_URL}keywords`, { keyword });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
