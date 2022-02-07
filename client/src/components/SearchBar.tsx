import React from 'react';

export default function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) {
  return (
    <div className={`search-bar`}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
      />
    </div>
  );
}
