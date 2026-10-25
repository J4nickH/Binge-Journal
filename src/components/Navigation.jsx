import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Film, TrendingUp, Search, BookmarkCheck } from 'lucide-react';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container fluid className="px-4">
        <Navbar.Brand as={NavLink} to="/watchlist" className="fw-bold d-flex align-items-center gap-2">
          <Film className="text-primary" size={24} /> Binge Journal
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
            <Nav.Link as={NavLink} to="/watchlist" className="d-flex align-items-center gap-1">
              <BookmarkCheck size={18} /> Watchlist
            </Nav.Link>
            <Nav.Link as={NavLink} to="/trending" className="d-flex align-items-center gap-1">
              <TrendingUp size={18} /> Trending
            </Nav.Link>
            <Nav.Link as={NavLink} to="/search" className="d-flex align-items-center gap-1">
              <Search size={18} /> Search
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;