'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter hook
import { fetchMoviesByYear, Movie } from '../api/tmdbApi'; // Import your API functions
import '../styles/Movie.css'; // Import CSS for styling

const FilterByYear: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null); // Selected year
  const [movies, setMovies] = useState<Movie[]>([]); // Movies for the selected year
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [years, setYears] = useState<number[]>([]); // List of available years for filtering
  const router = useRouter(); // Use the router for programmatic navigation

  // Fetch available years on component mount
  useEffect(() => {
    const loadYears = async () => {
      const currentYear = new Date().getFullYear();
      const yearRange = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);
      setYears(yearRange);
    };

    loadYears();
  }, []);

  // Fetch movies for the selected year (if needed for the current page)
  useEffect(() => {
    const loadMovies = async () => {
      if (selectedYear) {
        setLoading(true);
        try {
          const fetchedMovies = await fetchMoviesByYear(selectedYear);
          setMovies(fetchedMovies);
        } catch (error) {
          console.error('Failed to fetch movies for the selected year:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadMovies();
  }, [selectedYear]);

  // Handle year selection and navigate to another page
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(e.target.value);
    setSelectedYear(year);
    router.push(`/pages/year/${year}`); // Navigate to the new page
  };

  return (
    <div className="filter-by-year-page">
      {/* Year Selector */}
      <div className="year-selector">
        <label htmlFor="year">Select a Year:</label>
        <select
          id="year"
          value={selectedYear || ''}
          onChange={handleYearChange}
        >
          <option value="" disabled>
            Choose a year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Display Movies (if needed for this page) */}
      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length > 0 ? (
        <div>
          {/* Render movie cards or any other UI */}
          <p>Displaying movies for {selectedYear}</p>
        </div>
      ) : (
        selectedYear && <p>No movies found for this year.</p>
      )}
    </div>
  );
};

export default FilterByYear;
