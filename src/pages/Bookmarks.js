import React from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';

function Bookmarks() {
  const { bookmarks, removeBookmark } = useBookmarks();

  if (bookmarks.length === 0) {
    return <p className="p-4">No bookmarked movies yet.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bookmarked Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {bookmarks.map((movie) => (
          <div key={movie.imdbID} className="bg-gray-800 rounded overflow-hidden">
            <Link to={`/movie/${movie.imdbID}`}>
              {movie.Poster && (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-64 object-cover"
                />
              )}
            </Link>
            <div className="p-2">
              <h3 className="font-bold text-sm">{movie.Title}</h3>
              <p className="text-xs">{movie.Year}</p>
              <button
                onClick={() => removeBookmark(movie.imdbID)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookmarks;
