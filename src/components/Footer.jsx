import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Film, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-auto border-top border-secondary">
      <Container>
        <Row className="gy-3 align-items-center">
          {/* Left: App Identity */}
          <Col md={4} className="text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
              <Film className="text-primary" size={20} />
              <span className="fw-bold">Binge Journal</span>
            </div>
            <p className="text-light small mb-0">
              Your personal movie & TV series discovery companion.
            </p>
          </Col>

          {/* Center: Course & Tech Details */}
          <Col md={4} className="text-center">
            <p className="mb-1 small text-light">
              Built with <span className="text-info fw-semibold">React</span> & <span className="text-primary fw-semibold">Bootstrap</span>
            </p>
            <p className="text-light small mb-0">
              Final Project • Web Programming 1
            </p>
          </Col>

          {/* Right: Author & API Attribution */}
          <Col md={4} className="text-center text-md-end">
            <p className="mb-1 small text-light">
              Developed by <span className="fw-semibold text-warning">Janick Hoffmann</span>
            </p>
            <p className="text-light x-small mb-0" style={{ fontSize: '0.75rem' }}>
              Data provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="text-decoration-none text-light">TMDB API</a>. This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;