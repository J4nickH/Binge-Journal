import React from 'react';
import { Card } from 'react-bootstrap';
import { Bookmark, CheckCircle } from 'lucide-react';

const MovieCard = ({ movie, onSelectMovie, watchlist = [], watchedList = [] }) => {
  if (!movie) return null;

  // Check if movie is in user's lists safely
  const isInWatchlist = watchlist.some((item) => item?.id === movie.id);
  const isWatched = watchedList.some((item) => item?.id === movie.id);

  // TMDB gives relative poster paths
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const title = movie.title || movie.name || 'Untitled';
  const releaseDate = movie.release_date || movie.first_air_date || '';
  const year = releaseDate ? releaseDate.split('-')[0] : 'N/A';

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onSelectMovie === 'function') {
      onSelectMovie(movie);
    }
  };

  return (
    <Card 
      className="h-100 shadow-sm position-relative movie-card border-0"
      onClick={handleClick}
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
    >
      {/* Corner Status Badge */}
      <div className="position-absolute top-0 end-0 p-2 z-1">
        {isInWatchlist && (
          <span className="badge bg-primary rounded-pill p-2 shadow me-1">
            <Bookmark size={16} />
          </span>
        )}
        {isWatched && (
          <span className="badge bg-success rounded-pill p-2 shadow">
            <CheckCircle size={16} />
          </span>
        )}
      </div>

      <Card.Img 
        variant="top" 
        src={posterUrl} 
        alt={title} 
        style={{ height: '300px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
      />
      <Card.Body className="d-flex flex-column justify-content-between p-2">
        <Card.Title className="fs-6 text-truncate mb-1">{title}</Card.Title>
        <Card.Text className="text-muted small mb-0">{year}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;