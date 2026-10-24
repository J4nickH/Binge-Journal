const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Helper to fetch trending movies/series for Screen 1 (Trending)
export const fetchTrending = async (mediaType = 'all', timeWindow = 'day') => {
  try {
    const response = await fetch(`${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch trending data');
    const data = await response.json();
    return data.results; // Returns array of movies/shows
  } catch (error) {
    console.error("Error fetching trending:", error);
    return [];
  }
};

// Helper to search movies/shows for Screen 2 (Search)
export const searchMovies = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching:", error);
    return [];
  }
};