// src/app/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { fetchGenres, fetchMoviesByGenre, Genre, Movie } from '../../api/tmdbApi';
import GenreSection from '../../components/GenreSection';
import Link from 'next/link';
import '../../styles/Movie.css';

const Movies: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreMovies, setGenreMovies] = useState<{ [key: number]: Movie[] }>({});

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
    };

    loadGenresAndMovies();
  }, []);

  return (
    <div className="movies-page">
      <h1>Movies by Genre</h1>
      {genres.map((genre) => (
        <div key={genre.id} className="genre-block">
          
          <Link href={`/pages/genre/${genre.id}`} className="view-more">
          {genre.name} ➡️
          </Link>
          <GenreSection movies={genreMovies[genre.id] || []} />
        </div>
      ))}
    </div>
  );
};

export default Movies;
