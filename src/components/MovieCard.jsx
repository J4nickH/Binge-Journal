import React from 'react';
import { Card } from 'react-bootstrap';
import { Bookmark, CheckCircle } from 'lucide-react';

const MovieCard = ({ movie, onSelectMovie, watchlist = [], watchedList = [] }) => {
  // Check if movie is in user's lists
  const isInWatchlist = watchlist.some((item) => item.id === movie.id);
  const isWatched = watchedList.some((item) => item.id === movie.id);

  // TMDB gives relative poster paths, handle cases where poster is missing
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const title = movie.title || movie.name; // TMDB uses 'title' for movies, 'name' for TV series
  const releaseDate = movie.release_date || movie.first_air_date || '';
  const year = releaseDate ? releaseDate.split('-')[0] : 'N/A';

  return (
    <Card 
      className="h-100 shadow-sm position-relative cursor-pointer movie-card"
      onClick={() => onSelectMovie(movie)}
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
    >
      {/* Corner Status Badge matching your sketch */}
      <div className="position-absolute top-0 end-0 p-2 z-1">
        {isInWatchlist && (
          <span className="badge bg-primary rounded-pill p-2 shadow">
            <Bookmark size={16} />
          </span>
        )}
        {isWatched && (
          <span className="badge bg-success rounded-pill p-2 shadow ms-1">
            <CheckCircle size={16} />
          </span>
        )}
      </div>

      <Card.Img 
        variant="top" 
        src={posterUrl} 
        alt={title} 
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="fs-6 text-truncate mb-1">{title}</Card.Title>
        <Card.Text className="text-muted small mb-0">{year}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;