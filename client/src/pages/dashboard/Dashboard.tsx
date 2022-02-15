import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Pagination from '../../components/Pagination';
import '../../assets/styles/dashboard.scss';
import { isPastesLoadingState, pastesState } from '../../recoil/pastes/atoms';
import Paste from './Paste';
import { PastesResponse } from '../../@types';
import { debouncedFetchData } from '../../network/debounce-fetch';
import TextInput from '../../components/TextInput';

const Dashboard = () => {
  const [pastes, setPastes] = useRecoilState(pastesState);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useRecoilState(isPastesLoadingState);

  useEffect(() => {
    setPastes({ ...pastes, page: 1 });
  }, [query]);

  useEffect(() => {
    setIsLoading(true);
    debouncedFetchData(query, pastes.page, (res: PastesResponse) => {
      setPastes(res);
      setIsLoading(false);
      console.log('fetched pastes');
    });
  }, [pastes.page, query]);
  return (
    <div className={`dashboard container ${isLoading && 'loading'}`}>
      {isLoading && <div className={`loading`}>Loading...</div>}
      <TextInput inputState={query} setInputState={setQuery} name="search" />
      <Pagination pastes={pastes} setPastes={setPastes} />
      {pastes.pastes &&
        pastes.pastes.map((paste, i) => (
          <div key={paste.id} className={`paste-container`}>
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
