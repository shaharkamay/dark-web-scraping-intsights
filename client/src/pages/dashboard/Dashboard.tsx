import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Pagination from '../../components/Pagination';
import {
  currentPastesQuery,
  numPagesQuery,
} from '../../recoil/pastes/selectors';
import '../../assets/styles/dashboard.scss';
import { pagesState } from '../../recoil/pastes/atoms';

const Dashboard = () => {
  const [, setPages] = useRecoilState(pagesState);
  const numPages = useRecoilValue(numPagesQuery);
  useEffect(() => {
    setPages((pages) => ({ ...pages, numPages }));
  }, []);

  const pastes = useRecoilValue(currentPastesQuery);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {pastes &&
        pastes.map((paste, i) => (
          <div className="paste" key={`paste-${i}`}>
            <h2>{paste.title}</h2>
            <p>{paste.content}</p>
            <p>{paste.author}</p>
            <p>{paste.date}</p>
          </div>
        ))}
      <Pagination />
    </div>
  );
};

export default Dashboard;
