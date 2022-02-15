import React from 'react';
import { PastesResponse } from '../@types';

export default function Pagination({
  pastes,
  setPastes,
}: {
  pastes: PastesResponse;
  setPastes: (pastes: PastesResponse) => void;
}) {
  return (
    <div className={`pagination`}>
      {[...Array(Math.ceil(pastes.count / 10))].map((_, i) => (
        <button
          className={`default--button ${
            pastes.page === i + 1 ? 'active-btn' : ''
          }`}
          onClick={() => setPastes({ ...pastes, page: i + 1 })}
          key={`page-btn-${i}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
