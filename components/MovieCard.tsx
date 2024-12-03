// components/MovieCard.tsx
import Link from 'next/link';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link className="text-decoration-none text-dark" href={`/pages/player/${movie.id}`}>
      
        <div className="card h-100" style={ { backgroundColor: "#A3B18A" } }>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="card-img-top"
            alt={movie.title}
          />
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            <p className="card-text">
              <small className="text-muted">Release Date: {movie.release_date}</small>
            </p>
          </div>
        </div>

    </Link>
  );
};

export default MovieCard;
