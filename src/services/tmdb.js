const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrending = async (mediaType = 'all', timeWindow = 'day') => {
  try {
    const response = await fetch(`${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(`Error fetching trending ${mediaType}:`, error);
    throw error; 
  }
};

// Helper to search movies/shows for Screen 2 (Search)
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error('Failed to fetch search results');
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching:", error);
    throw error; // 
  }
};