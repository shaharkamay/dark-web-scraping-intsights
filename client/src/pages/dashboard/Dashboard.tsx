import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Pagination from '../../components/Pagination';
import '../../assets/styles/dashboard.scss';
import { isPastesLoadingState, pastesState } from '../../recoil/pastes/atoms';
import Paste from './Paste';
import SearchBar from '../../components/SearchBar';
import { PastesResponse } from '../../@types';
import { debouncedFetchData } from '../../network/debounce-fetch';

const source = new EventSource('http://localhost:8080/api/pastes/sse');

const Dashboard = () => {
  const [pastes, setPastes] = useRecoilState(pastesState);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useRecoilState(isPastesLoadingState);

  useEffect(() => {
    source.onmessage = (event) => {
      if (query === '') {
        const eventPastes = JSON.parse(event.data);
        setPastes(eventPastes);
      }
    };

    setPastes({ ...pastes, page: 1 });
  }, [query]);

  useEffect(() => {
    setIsLoading(true);
    debouncedFetchData(query, pastes.page, (res: PastesResponse) => {
      console.log(pastes.page);
      setPastes(res);
      setIsLoading(false);
      console.log('fetched');
    });
  }, [pastes.page, query]);
  return (
    <div className={`dashboard container ${isLoading && 'loading'}`}>
      {isLoading && <div className={`loading`}>Loading...</div>}
      <SearchBar query={query} setQuery={setQuery} />
      <Pagination pastes={pastes} setPastes={setPastes} />
      {pastes.pastes &&
        pastes.pastes.map((paste, i) => (
          <div key={`paste-${i}`} className={`paste-container`}>
            <hr />
            <Paste paste={paste} />
            {i === pastes.pastes.length - 1 && <hr />}
          </div>
        ))}
      <Pagination pastes={pastes} setPastes={setPastes} />
      {isLoading && <div className={`loading`}>Loading...</div>}
    </div>
  );
};

export default Dashboard;
