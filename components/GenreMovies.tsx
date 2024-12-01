import React from 'react';
import { Movie } from '../api/tmdbApi';
import './GenreSection.css';
import Link from 'next/link';

interface GenreSectionProps {
  movies: Movie[];
}

const GenreSection: React.FC<GenreSectionProps> = ({ movies }) => (
  <div className="genre-section" style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      padding: '40px',
      justifyContent: 'space-between',
    }}>
      {movies.map((movie) => (
        <Link href={`/pages/player/${movie.id}`} key={movie.id} className="movie-card-link">
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster" style={{ 
                width: '100%',
                height: '280px',
                objectFit: 'cover',
              }}
            
          />
          <div className="movie-info">
            <h6 className="movie-title">{movie.title}</h6>
            <p className="movie-release-date">{new Date(movie.release_date).getFullYear()}</p>
          </div>
        </div>
        </Link>
      ))}
  </div>
);

export default GenreSection;
