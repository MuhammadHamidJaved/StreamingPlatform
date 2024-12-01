import React, { useRef } from 'react';
import { Movie } from '../api/tmdbApi';
import Link from 'next/link';
import './GenreSection.css';

interface GenreSectionProps {
  movies: Movie[];
}

const GenreSection: React.FC<GenreSectionProps> = ({ movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -300, behavior: 'smooth' }); // Scroll left by 300px
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 300, behavior: 'smooth' }); // Scroll right by 300px
    }
  };

  return (
    <div className="genre-section">
      <button className="scroll-arrow left-arrow" onClick={scrollLeft}>
        &larr;
      </button>
      <div className="movies-row" ref={rowRef}>
        {movies.map((movie) => (
          <Link
            href={`/pages/player/${movie.id}`}
            key={movie.id}
            className="movie-card-link"
          >
            <div className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h6 className="movie-title">{movie.title}</h6>
                <p className="movie-release-date">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button className="scroll-arrow right-arrow" onClick={scrollRight}>
        &rarr;
      </button>
    </div>
  );
};

export default GenreSection;
