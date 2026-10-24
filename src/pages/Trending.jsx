import React, { useState, useEffect, useRef } from 'react';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchTrending } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const Trending = ({ watchlist, watchedList, onSelectMovie }) => {
  const [trendingAll, setTrendingAll] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refs for scrolling rows horizontally
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);

  useEffect(() => {
    const loadTrendingData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [allData, moviesData, seriesData] = await Promise.all([
          fetchTrending('all', 'day'),
          fetchTrending('movie', 'day'),
          fetchTrending('tv', 'day'),
        ]);

        setTrendingAll(allData);
        setTrendingMovies(moviesData);
        setTrendingSeries(seriesData);
      } catch (err) {
        setError('Failed to load trending content. Please check your internet connection or API key.');
      } finally {
        setLoading(false);
      }
    };

    loadTrendingData();
  }, []);

  // Scroll handler function
  const scrollRow = (ref, direction) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollAmount = clientWidth * 0.75; // Scroll by 75% of the visible width
      ref.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading content...</span>
        </Spinner>
        <p className="mt-2 text-muted">Fetching trending movies & series...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Reusable Horizontal Row Component with Arrow Buttons
  const renderHorizontalRow = (title, items, rowRef) => (
    <section className="mb-5 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold m-0">{title}</h3>
        <div>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            className="me-2 rounded-circle"
            onClick={() => scrollRow(rowRef, 'left')}
          >
            <ChevronLeft size={18} />
          </Button>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            className="rounded-circle"
            onClick={() => scrollRow(rowRef, 'right')}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Horizontal scrolling container */}
      <div 
        ref={rowRef}
        className="d-flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div key={item.id} style={{ minWidth: '200px', width: '200px', flexShrink: 0 }}>
            <MovieCard
              movie={item}
              watchlist={watchlist}
              watchedList={watchedList}
              onSelectMovie={onSelectMovie}
            />
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <Container fluid className="px-4 pb-5">
      <div className="my-4">
        <h1 className="fw-bold mb-4">Discover What's Binge-Worthy</h1>
        {renderHorizontalRow("🔥 New & Trending Today", trendingAll, row1Ref)}
        {renderHorizontalRow("🎬 Trending Movies", trendingMovies, row2Ref)}
        {renderHorizontalRow("📺 Trending Series", trendingSeries, row3Ref)}
      </div>
    </Container>
  );
};

export default Trending;