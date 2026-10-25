import React, { useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Bookmark, CheckCircle, Film, ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from '../components/MovieCard';

const WatchlistPage = ({ watchlist = [], watchedList = [], onSelectMovie }) => {
  const watchlistRef = useRef(null);
  const watchedRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const offset = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      ref.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <Container fluid className="px-4 my-4 pb-5">
      <h1 className="fw-bold mb-4">My Binge Journal</h1>

      {/* Watchlist Section */}
      <div className="mb-5 position-relative">
        <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
          <div className="d-flex align-items-center gap-2">
            <Bookmark className="text-primary" size={24} />
            <h3 className="fw-bold m-0 text-primary">Watchlist ({watchlist.length})</h3>
          </div>
          {watchlist.length > 0 && (
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" className="rounded-circle" size="sm" onClick={() => scroll(watchlistRef, 'left')} aria-label="Scroll left">
                <ChevronLeft size={20} />
              </Button>
              <Button variant="outline-secondary" className="rounded-circle" size="sm" onClick={() => scroll(watchlistRef, 'right')} aria-label="Scroll right">
                <ChevronRight size={20} />
              </Button>
            </div>
          )}
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-5 text-muted bg-white rounded shadow-sm p-4">
            <Film size={36} className="mb-2 text-secondary" />
            <h5>Your watchlist is empty</h5>
            <p className="small m-0">Explore trending or search for movies to add titles here.</p>
          </div>
        ) : (
          <div 
            ref={watchlistRef}
            className="d-flex gap-3 overflow-x-auto pb-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
          >
            {watchlist.map((movie) => (
              <div key={movie.id} style={{ minWidth: '220px', maxWidth: '220px', flex: '0 0 auto' }}>
                <MovieCard
                  movie={movie}
                  watchlist={watchlist}
                  watchedList={watchedList}
                  onSelectMovie={onSelectMovie}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Already Watched Section */}
      <div className="position-relative">
        <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
          <div className="d-flex align-items-center gap-2">
            <CheckCircle className="text-success" size={24} />
            <h3 className="fw-bold m-0 text-success">Already Watched ({watchedList.length})</h3>
          </div>
          {watchedList.length > 0 && (
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" className="rounded-circle" size="sm" onClick={() => scroll(watchedRef, 'left')} aria-label="Scroll left">
                <ChevronLeft size={20} />
              </Button>
              <Button variant="outline-secondary" className="rounded-circle" size="sm" onClick={() => scroll(watchedRef, 'right')} aria-label="Scroll right">
                <ChevronRight size={20} />
              </Button>
            </div>
          )}
        </div>

        {watchedList.length === 0 ? (
          <div className="text-center py-5 text-muted bg-white rounded shadow-sm p-4">
            <Film size={36} className="mb-2 text-secondary" />
            <h5>No completed titles yet</h5>
            <p className="small m-0">Click on any movie card and mark it as watched to add it here.</p>
          </div>
        ) : (
          <div 
            ref={watchedRef}
            className="d-flex gap-3 overflow-x-auto pb-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
          >
            {watchedList.map((movie) => (
              <div key={movie.id} style={{ minWidth: '220px', maxWidth: '220px', flex: '0 0 auto' }}>
                <MovieCard
                  movie={movie}
                  watchlist={watchlist}
                  watchedList={watchedList}
                  onSelectMovie={onSelectMovie}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default WatchlistPage;