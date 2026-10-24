import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { fetchTrending } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const Trending = ({ watchlist, watchedList, onSelectMovie }) => {
  const [trendingAll, setTrendingAll] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrendingData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all 3 categories asynchronously in parallel
        const [allData, moviesData, seriesData] = await Promise.all([
          fetchTrending('all', 'day'),
          fetchTrending('movie', 'day'),
          fetchTrending('tv', 'day'),
        ]);

        setTrendingAll(allData.slice(0, 4)); // Get top 4 for "New" section
        setTrendingMovies(moviesData.slice(0, 4)); // Get top 4 movies
        setTrendingSeries(seriesData.slice(0, 4)); // Get top 4 series
      } catch (err) {
        setError('Failed to load trending content. Please check your internet connection or API key.');
      } finally {
        setLoading(false);
      }
    };

    loadTrendingData();
  }, []);

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

  return (
    <Container className="pb-5">
      {/* Section 1: New / Trending Overview */}
      <section className="mb-4">
        <h2 className="fw-bold mb-3 border-bottom pb-2">New & Popular</h2>
        <Row xs={1} sm={2} md={4} className="g-3">
          {trendingAll.map((item) => (
            <Col key={item.id}>
              <MovieCard
                movie={item}
                watchlist={watchlist}
                watchedList={watchedList}
                onSelectMovie={onSelectMovie}
              />
            </Col>
          ))}
        </Row>
      </section>

      {/* Section 2: Trending Movies */}
      <section className="mb-4">
        <h2 className="fw-bold mb-3 border-bottom pb-2">Trending Movies</h2>
        <Row xs={1} sm={2} md={4} className="g-3">
          {trendingMovies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard
                movie={movie}
                watchlist={watchlist}
                watchedList={watchedList}
                onSelectMovie={onSelectMovie}
              />
            </Col>
          ))}
        </Row>
      </section>

      {/* Section 3: Trending Series */}
      <section className="mb-5">
        <h2 className="fw-bold mb-3 border-bottom pb-2">Trending Series</h2>
        <Row xs={1} sm={2} md={4} className="g-3">
          {trendingSeries.map((show) => (
            <Col key={show.id}>
              <MovieCard
                movie={show}
                watchlist={watchlist}
                watchedList={watchedList}
                onSelectMovie={onSelectMovie}
              />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default Trending;