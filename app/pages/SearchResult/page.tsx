'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useRouter and useSearchParams hooks
import { fetchMovieByTitle, Movie } from '../../../api/tmdbApi'; // Adjust path as needed
import GenreSection from '../../../components/GenreMovies'; // Import GenreSection component
import Loader from '../../../components/Loader'; // Import the Loader component
import '../../../styles/Movie.css'; // Import CSS for styling

const SearchResultsPage: React.FC = () => {
  const router = useRouter(); // Next.js router for navigation
  const searchParams = useSearchParams(); // Get query parameters from the URL
  const query = searchParams.get('query'); // Retrieve the 'query' parameter

  const [movies, setMovies] = useState<Movie[]>([]); // Movie search results
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(''); // Error message

  // Fetch movie results based on the query
  useEffect(() => {
    const searchMovies = async () => {
      if (!query) {
        setMovies([]); // Reset movies if no query
        return;
      }

      setLoading(true);
      setError('');
      try {
        const fetchedMovies = await fetchMovieByTitle(query);
        if (fetchedMovies.length > 0) {
          setMovies(fetchedMovies);
        } else {
          setError('No movies found for the given title.');
        }
      } catch (error) {
        setError('Failed to fetch movies.');
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]); // Refetch when the query changes

  return (
    <div className="search-results-page">
      <h1>Search Results</h1>

      {/* Loading and Error Handling */}
      {loading ? (
        <Loader /> // Show the loader while fetching data
      ) : (
        <>
          {error && <p>{error}</p>}

          {/* Display Movie Results */}
          {movies.length > 0 && !loading && (
            <GenreSection movies={movies} />
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
