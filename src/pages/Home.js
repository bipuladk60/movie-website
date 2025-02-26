// src/pages/Home.js
"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useBookmarks } from "../context/BookmarkContext"
import MovieRow from "../components/MovieRow"
import { Play, Info, Bookmark, X } from "lucide-react"
import { motion } from "framer-motion"

// Import the local Looper poster image
import looperPoster from "../assets/looper.webp"

function Home() {
  const [looperMovie, setLooperMovie] = useState(null)
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks()
  const navigate = useNavigate()

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST

  useEffect(() => {
    const fetchLooperMovie = async () => {
      try {
        const url = `https://${apiHost}/?t=Looper&r=json`
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": apiHost,
          },
        }
        const response = await fetch(url, options)
        const data = await response.json()
        setLooperMovie(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchLooperMovie()
  }, [apiKey, apiHost])

  const isBookmarked = looperMovie && bookmarks.some((movie) => movie.imdbID === looperMovie.imdbID)

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      {looperMovie && (
        <div className="relative w-full bg-cover bg-center z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.4)), url(${looperPoster})`,
              backgroundPosition: "center 20%",
            }}
          ></div>
          <div className="container mx-auto px-4 relative">
            <div className="h-[90vh] flex items-end">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="pb-16 max-w-4xl"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{looperMovie.Title}</h1>
                <p className="text-lg mb-8 text-gray-300 max-w-2xl">{looperMovie.Plot}</p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/movie/${looperMovie.imdbID}`)}
                    className="flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition duration-300 ease-in-out"
                  >
                    <Play size={20} className="mr-2" />
                    Watch Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/movie/${looperMovie.imdbID}`)}
                    className="flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition duration-300 ease-in-out"
                  >
                    <Info size={20} className="mr-2" />
                    More Info
                  </motion.button>
                  {isBookmarked ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeBookmark(looperMovie.imdbID)}
                      className="flex items-center justify-center bg-gray-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition duration-300 ease-in-out"
                    >
                      <X size={20} className="mr-2" />
                      Remove Bookmark
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addBookmark(looperMovie)}
                      className="flex items-center justify-center bg-gray-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition duration-300 ease-in-out"
                    >
                      <Bookmark size={20} className="mr-2" />
                      Add Bookmark
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        <MovieRow title="Trending Now" titleSize="text-2xl md:text-3xl" query="Hollywood" />
        <MovieRow title="Action Packed" titleSize="text-2xl md:text-3xl" query="Action" />
        <MovieRow title="Romance" titleSize="text-2xl md:text-3xl" query="Romance" />
        <MovieRow title="Laugh Out Loud" titleSize="text-2xl md:text-3xl" query="Comedy" />
      </div>
    </div>
  )
}

export default Home

