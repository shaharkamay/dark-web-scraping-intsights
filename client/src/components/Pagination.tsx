import React from 'react';
import { useRecoilState } from 'recoil';
import { pagesState } from '../recoil/pastes/atoms';

export default function Pagination() {
  const [pages, setPages] = useRecoilState(pagesState);

  return (
    <div className={`pagination`}>
      {[...Array(pages.numPages)].map((_, i) => (
        <button
          className={`default--button ${
            pages.current === i + 1 ? 'active-btn' : ''
          }`}
          onClick={() => setPages((pages) => ({ ...pages, current: i + 1 }))}
          key={`page-btn-${i}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
