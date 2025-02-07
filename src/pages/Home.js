"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useBookmarks } from "../context/BookmarkContext"
import MovieRow from "../components/MovieRow"
import { Play, Info, Bookmark, X } from "lucide-react"
import { motion } from "framer-motion"

// Import the local Matrix poster image
import matrixPoster from "../assets/matrix.jpg"

function Home() {
  const [matrixMovie, setMatrixMovie] = useState(null)
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks()
  const navigate = useNavigate()

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST

  useEffect(() => {
    const fetchMatrixMovie = async () => {
      try {
        const url = `https://${apiHost}/?t=The Matrix&r=json`
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": apiHost,
          },
        }
        const response = await fetch(url, options)
        const data = await response.json()
        setMatrixMovie(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchMatrixMovie()
  }, [apiKey, apiHost])

  const isBookmarked = matrixMovie && bookmarks.some((movie) => movie.imdbID === matrixMovie.imdbID)

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      {matrixMovie && (
        <div
          className="relative w-full h-[90vh] bg-cover bg-center flex items-end z-0"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.4)), url(${matrixPoster})`,
            backgroundPosition: "center 20%", // Adjust this value to move the image down
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-16 max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{matrixMovie.Title}</h1>
            <p className="text-lg mb-8 text-gray-300 max-w-2xl">{matrixMovie.Plot}</p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/movie/${matrixMovie.imdbID}`)}
                className="flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition duration-300 ease-in-out"
              >
                <Play size={20} className="mr-2" />
                Watch Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/movie/${matrixMovie.imdbID}`)}
                className="flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                <Info size={20} className="mr-2" />
                More Info
              </motion.button>
              {isBookmarked ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeBookmark(matrixMovie.imdbID)}
                  className="flex items-center justify-center bg-gray-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition duration-300 ease-in-out"
                >
                  <X size={20} className="mr-2" />
                  Remove Bookmark
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addBookmark(matrixMovie)}
                  className="flex items-center justify-center bg-gray-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition duration-300 ease-in-out"
                >
                  <Bookmark size={20} className="mr-2" />
                  Add Bookmark
                </motion.button>
              )}
            </div>
          </motion.div>
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

