import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MovieSection({ sectionTitle, query }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST;

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      const url = `https://${apiHost}/?s=${encodeURIComponent(query)}&r=json&page=1`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': apiHost
        }
      };
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setMovies(data.Search || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="px-4 mb-8">
      <h2 className="text-xl font-bold mb-4">{sectionTitle}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {movies.map((m) => (
          <div
            key={m.imdbID}
            onClick={() => navigate(`/movie/${m.imdbID}`)}
            className="bg-gray-800 rounded overflow-hidden cursor-pointer hover:scale-105 transform transition-all"
          >
            {m.Poster && (
              <img
                src={m.Poster}
                alt={m.Title}
                className="w-full h-60 object-cover"
              />
            )}
            <div className="p-2">
              <h3 className="text-sm font-semibold">{m.Title}</h3>
              <p className="text-xs">{m.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSection;
