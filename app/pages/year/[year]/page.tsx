'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Import useParams hook
import { fetchMoviesByYear, Movie } from '../../../../api/tmdbApi'; // Fetch movies by year
import GenreSection from '../../../../components/GenreMovies'; // Component to display movies
import '../../../../styles/Movie.css'; // Import CSS for styling
import Loader from '../../../../components/Loader'; // Import Loader component

const MoviesByYear: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Movies for the selected year
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const { year } = useParams(); // Get year from the URL

  useEffect(() => {
    const loadMovies = async () => {
      if (year) {
        setLoading(true);
        try {
          // Fetch movies based on the year from the URL
          const fetchedMovies = await fetchMoviesByYear(Number(year));
          setMovies(fetchedMovies);
        } catch (error) {
          console.error('Failed to fetch movies:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadMovies();
  }, [year]);

  return (
    <div className="movies-by-year-page">
      {loading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <GenreSection movies={movies} />
      ) : (
        <p>No movies found for the year {year}.</p>
      )}
    </div>
  );
};

export default MoviesByYear;
