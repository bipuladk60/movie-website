import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const [movies, setMovies] = useState([]);

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST;

  useEffect(() => {
    if (!query.trim()) return;

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.imdbID}`}
            key={movie.imdbID}
            className="bg-gray-800 rounded overflow-hidden hover:scale-105 transform transition"
          >
            {movie.Poster && (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-72 object-cover"
              />
            )}
            <div className="p-2">
              <h3 className="font-bold text-sm">{movie.Title}</h3>
              <p className="text-xs">{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
