import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bookmark, CheckCircle, Film } from 'lucide-react';
import MovieCard from '../components/MovieCard';

const WatchlistPage = ({ watchlist = [], watchedList = [], onSelectMovie }) => {
  return (
    <Container className="my-4 pb-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold mb-2">My Binge Journal</h1>
        <p className="text-secondary">Track what you plan to watch and keep a log of completed titles.</p>
      </div>

      <Row className="g-4">
        {/* Left Column: Watchlist */}
        <Col md={6} className="border-end-md">
          <Card className="border-0 bg-transparent">
            <Card.Body className="p-0">
              <div className="d-flex align-items-center gap-2 mb-3 border-bottom pb-2">
                <Bookmark className="text-primary" size={24} />
                <h3 className="fw-bold m-0 text-primary">Watchlist ({watchlist.length})</h3>
              </div>

              {watchlist.length === 0 ? (
                <div className="text-center py-5 text-muted bg-white rounded shadow-sm p-4">
                  <Film size={36} className="mb-2 text-secondary" />
                  <h5>Your watchlist is empty</h5>
                  <p className="small m-0">Explore trending or search for movies to add titles here.</p>
                </div>
              ) : (
                <Row xs={1} sm={2} lg={2} className="g-3">
                  {watchlist.map((movie) => (
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
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Already Watched */}
        <Col md={6}>
          <Card className="border-0 bg-transparent">
            <Card.Body className="p-0">
              <div className="d-flex align-items-center gap-2 mb-3 border-bottom pb-2">
                <CheckCircle className="text-success" size={24} />
                <h3 className="fw-bold m-0 text-success">Already Watched ({watchedList.length})</h3>
              </div>

              {watchedList.length === 0 ? (
                <div className="text-center py-5 text-muted bg-white rounded shadow-sm p-4">
                  <Film size={36} className="mb-2 text-secondary" />
                  <h5>No completed titles yet</h5>
                  <p className="small m-0">Click on any movie card and mark it as watched to add it here.</p>
                </div>
              ) : (
                <Row xs={1} sm={2} lg={2} className="g-3">
                  {watchedList.map((movie) => (
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
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WatchlistPage;