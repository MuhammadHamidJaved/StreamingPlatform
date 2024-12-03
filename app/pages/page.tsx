'use client';
import React, { useState, useEffect } from 'react';
import { fetchGenres, fetchMoviesByGenre, Genre, Movie } from '../../api/tmdbApi';
import GenreSection from '../../components/GenreSection';
import FilterByGenre from '../../components/FilterByGenre';
import FilterByYear from '../../components/FilterbyYear';
import SearchMovies from '../../components/SearchMoviesPage';
import Link from 'next/link';
import '../../styles/Movie.css';
import Loader from '../../components/Loader';

const Movies: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreMovies, setGenreMovies] = useState<{ [key: number]: Movie[] }>({});
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    const loadGenresAndMovies = async () => {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);

      const moviesByGenre: { [key: number]: Movie[] } = {};
      for (const genre of fetchedGenres) {
        const movies = await fetchMoviesByGenre(genre.id, 1); 
        moviesByGenre[genre.id] = movies.slice(0, 10); 
      }
      setGenreMovies(moviesByGenre);
      setLoading(false); // Set loading to false after data is loaded
    };

    loadGenresAndMovies();
  }, []);

  return (
    <div className="movies-page">
      <h1>Movies by Genre</h1>
      <SearchMovies />
      <FilterByGenre />
      <FilterByYear />

      {loading ? (
        <Loader />
      ) : (
        genres.map((genre) => (
          <div key={genre.id} className="genre-block">
            {genre.name}
            <Link href={`/pages/genre/${genre.id}`} className="view-more">
              {/* Green arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
                width="48px"
                height="32px"
              >
                <path d="M22 12l-8-4v3H2v2h12v3l8-4z" />
              </svg>
            </Link>
            <GenreSection movies={genreMovies[genre.id] || []} />
          </div>
        ))
      )}
    </div>
  );
};

export default Movies;
