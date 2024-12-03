'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter hook
import { fetchGenres, Genre } from '../api/tmdbApi'; // Adjust the path as needed
import '../styles/Movie.css'; // Import CSS for styling

const FilterByGenre: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const router = useRouter(); // Use the router for programmatic navigation

  // Fetch genres on component mount
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const fetchedGenres = await fetchGenres();
        setGenres(fetchedGenres);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      }
    };

    loadGenres();
  }, []);

  // Handle genre selection and redirect
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = Number(e.target.value);
    setSelectedGenre(genreId);

    // Programmatically navigate to the selected genre page
    if (genreId) {
      router.push(`/pages/genre/${genreId}`);
    }
  };

  return (
    <div className="filter-by-genre-page">
     
      <div className="genre-selector">
        <label htmlFor="genre">Select a Genre:</label>
        <select
          id="genre"
          value={selectedGenre || ''}
          onChange={handleGenreChange} 
        >
          <option value="" disabled>
            Choose a genre
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterByGenre;
