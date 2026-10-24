import React, { useState } from 'react';
import { Container, Form, InputGroup, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Search as SearchIcon, Film } from 'lucide-react';
import { searchMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const SearchPage = ({ watchlist, watchedList, onSelectMovie }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const data = await searchMovies(query);
      // Filter out actors/person results, keep movies and tv shows
      const filteredResults = data.filter(
        (item) => item.media_type === 'movie' || item.media_type === 'tv'
      );
      setResults(filteredResults);
    } catch (err) {
      setError('Search failed. Please try again or check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="my-4 pb-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold mb-3">Search Movies & TV Shows</h1>
        <p className="text-secondary">Find your favorite titles and add them to your collection.</p>
      </div>

      {/* Search Bar - Matches sketch image_62fc12.png */}
      <Row className="justify-content-center mb-5">
        <Col md={8} lg={6}>
          <Form onSubmit={handleSearch}>
            <InputGroup size="lg" className="shadow-sm">
              <Form.Control
                type="text"
                placeholder="Search for a movie or TV show..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button variant="primary" type="submit" className="d-flex align-items-center gap-1">
                <SearchIcon size={20} /> Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Searching database...</p>
        </div>
      )}

      {/* Error Message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Results Grid - Matches sketch image_62fc12.png */}
      {!loading && !error && searched && results.length > 0 && (
        <div>
          <h4 className="fw-bold mb-3">Results ({results.length})</h4>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {results.map((item) => (
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
        </div>
      )}

      {/* No Results State */}
      {!loading && !error && searched && results.length === 0 && (
        <div className="text-center my-5 text-muted">
          <Film size={48} className="mb-2 text-secondary" />
          <h4>No results found for "{query}"</h4>
          <p>Try searching with a different keyword or check the spelling.</p>
        </div>
      )}

      {/* Initial Empty State before searching */}
      {!searched && !loading && (
        <div className="text-center my-5 text-muted">
          <p>Enter a title above and press Search to discover movies and series.</p>
        </div>
      )}
    </Container>
  );
};

export default SearchPage;