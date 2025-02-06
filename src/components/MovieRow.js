import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';

function MovieRow({ title, titleSize = 'text-xl', query }) {
  const [movies, setMovies] = useState([]);
  const { addBookmark } = useBookmarks();
  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `https://${apiHost}/?s=${encodeURIComponent(
          query
        )}&r=json&page=1`;
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost,
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.Search || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className="w-full mb-6">
      <h2 className={`${titleSize} font-bold mb-4 px-2`}>{title}</h2>
      <div className="flex gap-4 overflow-x-scroll px-2">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="relative min-w-[200px] rounded overflow-hidden bg-gray-800 flex-shrink-0 hover:scale-105 transform transition"
          >
            {/* Link to Movie Details */}
            <Link to={`/movie/${movie.imdbID}`}>
              {movie.Poster && (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-72 object-cover"
                />
              )}
            </Link>

            {/* Hover Bookmark Button */}
            <div className="absolute bottom-2 left-2 opacity-0 hover:opacity-100 transition bg-black bg-opacity-70 rounded-lg px-3 py-1">
              <button
                onClick={() => addBookmark(movie)}
                className="text-white text-sm font-bold"
              >
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
