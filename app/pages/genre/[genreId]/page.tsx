'use client';
import React, { useState, useEffect } from 'react';
import { fetchMoviesByGenre, Movie } from '../../../../api/tmdbApi';
import GenreSection from '../../../../components/GenreMovies'; 
import Pagination from '../../../../components/CustomPagination/CustomPagination'; 
import '../../../../styles/Movie.css'; 
import Loader from '@/components/Loader';

interface GenreMoviesProps {
  params: { genreId: string, genreName: string }; 
}

const GenreMovies: React.FC<GenreMoviesProps> = ({ params }) => {
  const { genreId, genreName } = params;   
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1); 

  useEffect(() => {
    
    const loadMovies = async () => {
      if (genreId) {
        try {
          const fetchedMovies = await fetchMoviesByGenre(Number(genreId), page);
          setMovies(fetchedMovies);
          const total = Math.ceil(400 / 20); 
          setTotalPages(total);
        } catch (error) {
          console.error('Failed to fetch movies:', error);
        }
      }
    };

    loadMovies();
  }, [genreId, page]); 

  return (
    <div className="movies-page">
      <h1>Movies in Genre {genreName}</h1>
      {movies.length > 0 ? (
        <>
          <GenreSection movies={movies} />
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default GenreMovies;
