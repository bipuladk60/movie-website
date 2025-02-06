import React, { useState } from 'react';
import { useBookmarks } from '../context/BookmarkContext';

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST;

  const { addBookmark, bookmarks, removeBookmark } = useBookmarks();

  const handleSearch = async (newPage = 1) => {
    if (!searchTerm.trim()) return;
    setPage(newPage);

    const url = `https://${apiHost}/?s=${encodeURIComponent(
      searchTerm
    )}&r=json&page=${newPage}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost
      }
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMovies(result.Search || []);
      setTotalResults(parseInt(result.totalResults || '0', 10));
    } catch (error) {
      console.error(error);
    }
  };

  const isBookmarked = (imdbID) => {
    return bookmarks.some((item) => item.imdbID === imdbID);
  };

  const handlePrevPage = () => {
    if (page > 1) handleSearch(page - 1);
  };

  const handleNextPage = () => {
    const maxPages = Math.ceil(totalResults / 10);
    if (page < maxPages) handleSearch(page + 1);
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl mb-4 font-bold">Search Movies</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          className="p-2 text-black rounded"
          type="text"
          placeholder="Type a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-white text-black px-4 py-2 rounded font-semibold"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>

      {/* Pagination Controls */}
      {movies.length > 0 && (
        <div className="flex items-center mb-4 gap-2">
          <button
            onClick={handlePrevPage}
            disabled={page <= 1}
            className="bg-white text-black px-2 py-1 rounded font-semibold disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} / {Math.ceil(totalResults / 10) || 1}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page >= Math.ceil(totalResults / 10)}
            className="bg-white text-black px-2 py-1 rounded font-semibold disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-white text-black p-4 rounded shadow flex flex-col"
          >
            <h3 className="font-bold mb-1">{movie.Title}</h3>
            <p className="mb-2">{movie.Year}</p>
            {movie.Poster && (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="mb-2 w-full h-auto"
              />
            )}

            {isBookmarked(movie.imdbID) ? (
              <button
                onClick={() => removeBookmark(movie.imdbID)}
                className="bg-red-500 text-white px-2 py-1 rounded font-semibold mt-auto"
              >
                Remove Bookmark
              </button>
            ) : (
              <button
                onClick={() => addBookmark(movie)}
                className="bg-black text-white px-2 py-1 rounded font-semibold mt-auto"
              >
                Bookmark
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
