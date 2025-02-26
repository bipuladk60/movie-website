//src/pages/MovieDetails.js
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookmarks } from '../context/BookmarkContext';
import { motion } from 'framer-motion';
import { Bookmark, Calendar, Film, Star, Users, Video } from 'lucide-react';

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
  }, [id, apiKey, apiHost]);

  if (!movie) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  );

  const isBookmarked = bookmarks.some((item) => item.imdbID === movie.imdbID);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          <div className="lg:w-1/3">
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster || "/placeholder.svg"}
                alt={movie.Title}
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
                <Film size={64} className="text-gray-600" />
              </div>
            )}
          </div>
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="mr-2" size={18} />
                <span>{movie.Year}</span>
              </div>
              <div className="flex items-center">
                <Video className="mr-2" size={18} />
                <span>{movie.Runtime}</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-2" size={18} />
                <span>{movie.imdbRating}/10</span>
              </div>
            </div>
            <p className="text-lg mb-6">{movie.Plot}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Genre</h2>
                <p>{movie.Genre}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Director</h2>
                <p>{movie.Director}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Writers</h2>
                <p>{movie.Writer}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  <Users className="inline mr-2" size={18} />
                  Cast
                </h2>
                <p>{movie.Actors}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isBookmarked ? removeBookmark(movie.imdbID) : addBookmark(movie)}
              className={`flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
                isBookmarked ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <Bookmark className="mr-2" size={18} />
              {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MovieDetails;
