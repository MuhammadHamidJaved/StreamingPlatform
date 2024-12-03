'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import '../styles/Movie.css'; 

const MovieSearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>(''); 
  const router = useRouter(); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== '') {
      router.push(`/pages/SearchResult?query=${query}`);
    }
  };

  return (
    <div className="movie-search-page">

      <form onSubmit={handleSearchSubmit}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={handleSearchChange}
          />
          <button style={{backgroundColor: "green",
             color: "white",
             padding: "5px",
             borderRadius: "10px",
             cursor: "pointer"}} type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default MovieSearchPage;
