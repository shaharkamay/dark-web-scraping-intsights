import axios from 'axios';

const BASE_URL = 'api/';

export const getPastes = async (page: number | null = null) => {
  const res = await axios.get(
    `${BASE_URL}pastes${page ? `?page=${page}` : ''}`
  );
  return res.data;
};

export const getNumPages = async () => {
  const res = await axios.get(`${BASE_URL}pastes/count-pages`);
  return res.data;
};
