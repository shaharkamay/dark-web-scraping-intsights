import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Pagination from '../../components/Pagination';
import '../../assets/styles/dashboard.scss';
import {
  isPastesLoadingState,
  pagesState,
  pastesState,
} from '../../recoil/pastes/atoms';
import Paste from './Paste';
import SearchBar from '../../components/SearchBar';
import { PasteWithEntities } from '../../@types';
import { debouncedFetchData } from '../../network/debounce-fetch';

const Dashboard = () => {
  const [pastes, setPastes] = useRecoilState(pastesState);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useRecoilState(isPastesLoadingState);
  const [pages, setPages] = useRecoilState(pagesState);

  useEffect(() => {
    setPages((pages) => ({ ...pages, current: 1 }));
  }, [query]);

  useEffect(() => {
    setIsLoading(true);
    debouncedFetchData(
      query,
      pages.current,
      (res: { count: number; pastes: PasteWithEntities[] }) => {
        setPastes(res);
        setIsLoading(false);
        console.log('fetched');
      }
    );
  }, [pages.current, query]);

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
      <Pagination />
      {pastes.pastes &&
        pastes.pastes.map((paste, i) => (
          <div key={`paste-${i}`} className={`paste-container`}>
            <hr />
            <Paste paste={paste} />
            {i === pastes.pastes.length - 1 && <hr />}
          </div>
        ))}
      <Pagination />
      {isLoading && <div className={`loading`}>Loading...</div>}
    </div>
  );
};

export default Dashboard;
