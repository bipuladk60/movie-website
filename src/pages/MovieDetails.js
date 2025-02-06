import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { addBookmark, bookmarks, removeBookmark } = useBookmarks();

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = `https://${apiHost}/?r=json&i=${id}`;
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost,
          },
        };
        const res = await fetch(url, options);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetails();
  }, [id]);

  if (!movie) return <div className="p-4">Loading...</div>;

  const isBookmarked = bookmarks.some((item) => item.imdbID === movie.imdbID);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-4">
        {movie.Poster && (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full md:w-1/3 object-cover rounded"
          />
        )}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p className="mb-2">Year: {movie.Year}</p>
          <p className="mb-2">Genre: {movie.Genre}</p>
          <p className="mb-2">Director: {movie.Director}</p>
          <p className="mb-2">Actors: {movie.Actors}</p>
          <p className="mb-2">Plot: {movie.Plot}</p>
          <p className="mb-2">imdbRating: {movie.imdbRating}</p>
          <div className="mt-4">
            {isBookmarked ? (
              <button
                onClick={() => removeBookmark(movie.imdbID)}
                className="bg-red-500 px-4 py-2 rounded font-semibold"
              >
                Remove Bookmark
              </button>
            ) : (
              <button
                onClick={() => addBookmark(movie)}
                className="bg-green-600 px-4 py-2 rounded font-semibold"
              >
                Bookmark
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
