'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import Pagination from '../../../components/CustomPagination/CustomPagination';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getMovies = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=94423c85c9367525fa4fc765186c06ca&language=en-US&page=${page}`)
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Top-Rated Movies</h1>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-3 mb-4" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '20px',
        }}>
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
       
      </div>
    </div>
  );
};

export default Movies;
