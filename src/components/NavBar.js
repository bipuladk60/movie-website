import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST;

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const url = `https://${apiHost}/?s=${encodeURIComponent(
          searchTerm
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
        setSuggestions(data.Search || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black">
      <div className="text-2xl font-bold">MovieApp</div>
      <div className="relative w-full max-w-md">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="w-full rounded-full p-3 text-black focus:outline-none"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        {suggestions.length > 0 && (
          <ul className="absolute bg-white text-black w-full rounded-lg shadow-lg mt-1">
            {suggestions.map((movie) => (
              <li
                key={movie.imdbID}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
              >
                {movie.Title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Home
        </Link>
        <Link
          to="/bookmarks"
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Bookmarks
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
