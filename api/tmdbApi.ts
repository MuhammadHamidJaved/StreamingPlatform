// src/api/tmdbApi.ts
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieSearchResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
  return response.data.genres;
};

export const fetchMoviesByGenre = async (genreId: number, page: number = 1): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreId}`
  );
  return response.data.results;
};

export const fetchAllGenreMovies = async (): Promise<{ [key: number]: Movie[] }> => {
  const genres = await fetchGenres();
  const moviesByGenre: { [key: number]: Movie[] } = {};

  for (const genre of genres) {
    const movies = await fetchMoviesByGenre(genre.id, 1); 
    moviesByGenre[genre.id] = movies;
  }

  return moviesByGenre;
};

export const fetchMoviesBySearch = async (query: string, page: number): Promise<MovieSearchResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        page,
        language: 'en-US',
      },
    });
    return response.data; // Return the results and pagination data
  } catch (error) {
    throw new Error('Error fetching movies from the API');
  }
};

export const fetchMovieByTitle = async (title: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: title,
        language: 'en-US',
      },
    });

    // Return the array of movie results
    return response.data.results || [];
  } catch (error) {
    throw new Error('Error fetching movie from the API');
  }
};

export const fetchMoviesByYear = async (year: number): Promise<Movie[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}&language=en-US`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies by year:', error);
    return [];
  }
};