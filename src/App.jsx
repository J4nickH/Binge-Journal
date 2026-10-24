import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Trending from './pages/Trending';
import SearchPage from './pages/SearchPage';
import WatchlistPage from './pages/WatchlistPage';

function App() {
  // State for Watchlist & Watched items persisted with localStorage
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
      <Navigation />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Trending watchlist={watchlist} setWatchlist={setWatchlist} />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/watchlist" element={<WatchlistPage watchlist={watchlist} watchedList={watchedList} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;