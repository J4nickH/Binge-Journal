import React, { useState, useEffect } from 'react';
import { Modal, Button, Badge, Row, Col, Spinner } from 'react-bootstrap';
import { Bookmark, CheckCircle, Trash2, Film } from 'lucide-react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieModal = ({ movie, onClose, watchlist, setWatchlist, watchedList, setWatchedList }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  if (!movie) return null;

  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date || '';
  const year = releaseDate ? releaseDate.split('-')[0] : 'N/A';
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const isInWatchlist = watchlist.some((item) => item.id === movie.id);
  const isWatched = watchedList.some((item) => item.id === movie.id);

  // Fetch YouTube Trailer from TMDB
  useEffect(() => {
    const fetchTrailer = async () => {
      setLoadingTrailer(true);
      const mediaType = movie.title ? 'movie' : 'tv';
      try {
        const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=${API_KEY}`);
        const data = await res.json();
        const trailer = data.results?.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube');
        setTrailerKey(trailer ? trailer.key : null);
      } catch (err) {
        console.error('Error fetching trailer:', err);
      } finally {
        setLoadingTrailer(false);
      }
    };

    fetchTrailer();
  }, [movie]);

  // Toggle Watchlist
  const handleToggleWatchlist = () => {
    if (isInWatchlist) {
      setWatchlist(watchlist.filter((item) => item.id !== movie.id));
    } else {
      setWatchlist([...watchlist, movie]);
      // Remove from watched list if moving back to watchlist
      setWatchedList(watchedList.filter((item) => item.id !== movie.id));
    }
  };

  // Toggle Watched List
  const handleToggleWatched = () => {
    if (isWatched) {
      setWatchedList(watchedList.filter((item) => item.id !== movie.id));
    } else {
      setWatchedList([...watchedList, movie]);
      // Remove from watchlist if marked as watched
      setWatchlist(watchlist.filter((item) => item.id !== movie.id));
    }
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{title} ({year})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-4">
          {/* Left Column: Image & Buttons */}
          <Col md={4} className="text-center">
            <img 
              src={posterUrl} 
              alt={title} 
              className="img-fluid rounded shadow mb-3" 
              style={{ maxHeight: '350px', objectFit: 'cover' }}
            />
            <div className="d-grid gap-2">
              <Button 
                variant={isInWatchlist ? 'warning' : 'outline-primary'} 
                onClick={handleToggleWatchlist}
                className="d-flex align-items-center justify-content-center gap-2"
              >
                <Bookmark size={18} /> 
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </Button>

              <Button 
                variant={isWatched ? 'success' : 'outline-success'} 
                onClick={handleToggleWatched}
                className="d-flex align-items-center justify-content-center gap-2"
              >
                <CheckCircle size={18} /> 
                {isWatched ? 'Already Watched' : 'Mark as Watched'}
              </Button>
            </div>
          </Col>

          {/* Right Column: Overview & Embedded Trailer */}
          <Col md={8}>
            <h5 className="fw-bold">Overview</h5>
            <p className="text-secondary">{movie.overview || 'No overview available for this title.'}</p>
            
            <div className="mb-3">
              <Badge bg="secondary" className="me-2">Rating: {movie.vote_average?.toFixed(1) || 'N/A'} / 10</Badge>
              <Badge bg="info">Popularity: {Math.round(movie.popularity || 0)}</Badge>
            </div>

            <hr />

            <h5 className="fw-bold d-flex align-items-center gap-2">
              <Film size={20} /> Trailer
            </h5>
            {loadingTrailer ? (
              <Spinner animation="border" size="sm" />
            ) : trailerKey ? (
              <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="text-muted small">No trailer available for this title.</p>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieModal;