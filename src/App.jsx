import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer'; // 1. Import Footer
import Trending from './pages/Trending';
import SearchPage from './pages/SearchPage';
import WatchlistPage from './pages/WatchlistPage';
import MovieModal from './components/MovieModal';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('binge_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [watchedList, setWatchedList] = useState(() => {
    const saved = localStorage.getItem('binge_watched');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('binge_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('binge_watched', JSON.stringify(watchedList));
  }, [watchedList]);

  return (
    <Router>
      {/* Flex container ensures footer stays at the bottom */}
      <div className="bg-light min-vh-100 d-flex flex-column">
        <Navigation />
        
        <div className="flex-grow-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <Trending 
                  watchlist={watchlist} 
                  watchedList={watchedList} 
                  onSelectMovie={setSelectedMovie} 
                />
              } 
            />
            <Route 
              path="/search" 
              element={
                <SearchPage 
                  watchlist={watchlist} 
                  watchedList={watchedList} 
                  onSelectMovie={setSelectedMovie} 
                />
              } 
            />
            <Route 
              path="/watchlist" 
              element={
                <WatchlistPage 
                  watchlist={watchlist} 
                  watchedList={watchedList} 
                  onSelectMovie={setSelectedMovie} 
                />
              } 
            />
          </Routes>
        </div>

        {/* 2. Render Footer at the bottom */}
        <Footer />

        {/* Detail Modal Popup */}
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          watchlist={watchlist}
          setWatchlist={setWatchlist}
          watchedList={watchedList}
          setWatchedList={setWatchedList}
        />
      </div>
    </Router>
  );
}

export default App;