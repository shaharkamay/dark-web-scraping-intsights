import axios from 'axios';
import { Alert, Keyword, PastesResponse } from '../@types';

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

export const getKeywords = async () => {
  try {
    const res = await axios.get<Keyword[]>(`${BASE_URL}keywords`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAlerts = async () => {
  try {
    const res = await axios.get<Alert[]>(`${BASE_URL}alerts`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteKeyword = async (keyword: string) => {
  try {
    const res = await axios.delete<string>(
      `${BASE_URL}keywords?keyword=${keyword}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
