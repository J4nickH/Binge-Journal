# 🎬 Binge Journal

**Binge Journal** is a modern, responsive React web application designed for movie and TV series discovery. It allows users to browse trending titles, search across a vast database, watch trailers, and manage personal "Watchlist" and "Already Watched" collections with persistent local storage.

Developed as a university final project for a Web Development course.

---

## 🚀 Tech Stack

* **Frontend Library:** React (v18+) with Vite
* **UI Framework:** React-Bootstrap & Bootstrap
* **Routing:** React Router DOM (v6)
* **Icons:** Lucide React
* **Data Source:** The Movie Database (TMDB) API
* **State Persistence:** Browser `localStorage`

---

## ✨ Features

1. **Discover & Trending Screen (`/`):**
   * Browse horizontal scrolling carousels of top-trending content (New & Popular, Movies, and TV Series).
   * Smooth navigational scroll buttons for an immersive streaming-platform feel.
2. **Dynamic Search Screen (`/search`):**
   * Real-time query search utilizing TMDB's multi-search endpoint.
   * Responsive grid layout displaying posters, titles, and release years.
3. **Watchlist & Watched Split-View (`/watchlist`):**
   * Manage content you plan to watch vs. titles you have already completed.
   * Persistent storage via `localStorage` simulating user profiles.
4. **Interactive Detail Modal:**
   * Click any card to open a detailed modal view featuring an overview, ratings, popularity score, and **embedded YouTube trailers**.
   * Toggle items instantly between your Watchlist and Watched lists.

---

## 🛠️ Getting Started & Installation

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your system.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/binge-journal.git](https://github.com/your-username/binge-journal.git)
cd binge-journal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
You will need a free API key from [TMDB](https://www.themoviedb.org/).
1. Create a file named `.env` in the **root directory** of the project.
2. Add your TMDB API key like this:
   ```env
   VITE_TMDB_API_KEY=your_actual_tmdb_api_key_here
   ```

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to the local URL provided by Vite (typically `http://localhost:5173`).

---

## 📂 Project Structure

```text
Binge-Journal/
├── node_modules/
├── public/
│   └── Movie_Icon.png
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieModal.jsx
│   │   └── Navigation.jsx
│   ├── pages/
│   │   ├── SearchPage.jsx
│   │   ├── Trending.jsx
│   │   └── WatchlistPage.jsx
│   ├── services/
│   │   └── tmdb.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## 👨‍💻 Author

* **Developed by:** Janick Hoffmann
* **Course:** Web Programming 1 University of Eastern Finnland

---

## 📝 Acknowledgements & API Notice
* Data and images provided by **[The Movie Database (TMDB) API](https://www.themoviedb.org/)**. 
* *This product uses the TMDB API but is not endorsed or certified by TMDB.*