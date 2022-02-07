import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Pagination from '../../components/Pagination';
import '../../assets/styles/dashboard.scss';
import {
  isPastesLoadingState,
  pagesState,
  pastesState,
} from '../../recoil/pastes/atoms';
import Paste from './Paste';
import SearchBar from '../../components/SearchBar';
import { Paste as IPaste } from '../../@types';
import { debouncedFetchData } from '../../network/debounce-fetch';

const Dashboard = () => {
  const [pastes, setPastes] = useRecoilState(pastesState);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useRecoilState(isPastesLoadingState);

  useEffect(() => {
    setIsLoading(true);
    debouncedFetchData(query, (res: { count: number; pastes: IPaste[] }) => {
      setPastes(res);
      setIsLoading(false);
    });
  }, [query]);

  const setPages = useSetRecoilState(pagesState);
  useEffect(() => {
    setPages((pages) => ({
      ...pages,
      numPages: Math.ceil(pastes.count / 10) || 1,
    }));
  }, [pastes.count]);

  return (
    <div className={`dashboard container ${isLoading && 'loading'}`}>
      {isLoading && <div className={`loading`}>Loading...</div>}
      <SearchBar query={query} setQuery={setQuery} />
      {pastes.pastes &&
        pastes.pastes.map((paste, i) => (
          <Paste key={`paste-${i}`} paste={paste} />
        ))}
      <Pagination />
    </div>
  );
};

export default Dashboard;
