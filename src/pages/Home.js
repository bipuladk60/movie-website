"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useBookmarks } from "../context/BookmarkContext"
import MovieRow from "../components/MovieRow"
import { Play, Info, Bookmark } from "lucide-react"
import { motion } from "framer-motion"

// Import the local Looper poster image
import looperPoster from "../assets/YQL2BV7.gif"

function Home() {
  const [looperMovie, setLooperMovie] = useState(null)
  const { bookmarks, addBookmark } = useBookmarks()
  const navigate = useNavigate()

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST

  useEffect(() => {
    const fetchLooperMovie = async () => {
      try {
        const url = `https://${apiHost}/?t=The Terminator&r=json`
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  }

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.2 },
  }

  return (
    <motion.div
      className="bg-black text-white min-h-screen font-['Inter',sans-serif]"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Hero Section */}
      {looperMovie && (
        <motion.div
          className="relative w-full bg-cover bg-center z-0 h-[90vh] overflow-hidden"
          variants={fadeIn}
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${looperPoster})`,
            backgroundPosition: "center 20%",
          }}
        >
          <div className="container mx-auto px-6 relative h-full">
            <div className="h-full flex items-end">
              <motion.div variants={staggerContainer} className="pb-24 max-w-3xl">
                {/* Movie metadata */}
                <motion.div variants={slideUp} className="flex items-center space-x-3 text-sm text-gray-400 mb-3">
                  <span>{looperMovie.Year}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  <span>{looperMovie.Runtime}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {looperMovie.imdbRating}
                  </span>
                </motion.div>

                <motion.h1
                  variants={slideUp}
                  className="text-5xl md:text-6xl font-bold mb-4 leading-tight tracking-tight"
                >
                  {looperMovie.Title}
                </motion.h1>

                <motion.p
                  variants={slideUp}
                  className="text-base md:text-lg mb-8 text-gray-300 max-w-2xl leading-relaxed"
                >
                  {looperMovie.Plot}
                </motion.p>

                <motion.div variants={slideUp} className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={buttonHover}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/movie/${looperMovie.imdbID}`)}
                    className="flex items-center justify-center bg-red-600 text-white px-8 py-3 rounded-md font-medium transition-colors hover:bg-red-700"
                  >
                    <Play size={18} className="mr-2" />
                    Watch Now
                  </motion.button>

                  <motion.button
                    whileHover={buttonHover}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/movie/${looperMovie.imdbID}`)}
                    className="flex items-center justify-center bg-zinc-800 text-white px-6 py-3 rounded-md font-medium transition-colors hover:bg-zinc-700"
                  >
                    <Info size={18} className="mr-2" />
                    More Info
                  </motion.button>

                  <motion.button
                    whileHover={buttonHover}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addBookmark(looperMovie)}
                    className={`flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors ${
                      isBookmarked
                        ? "bg-zinc-800 text-red-500 hover:bg-zinc-700"
                        : "bg-zinc-800 text-white hover:bg-zinc-700"
                    }`}
                  >
                    <Bookmark size={18} className={`mr-2 transition-transform ${isBookmarked ? "fill-red-500" : ""}`} />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Movie Rows with animated entrance */}
      <motion.div className="container mx-auto px-6 py-16 space-y-16" variants={fadeIn}>
        <MovieRowWrapper title="Trending Now" query="Hollywood" index={0} />
        <MovieRowWrapper title="Action Packed" query="Action" index={1} />
        <MovieRowWrapper title="Romance" query="Romance" index={2} />
        <MovieRowWrapper title="Laugh Out Loud" query="Comedy" index={3} />
      </motion.div>
    </motion.div>
  )
}

// Wrapper component to add animations to MovieRow
function MovieRowWrapper({ title, query, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
    >
      <h2 className="text-2xl font-medium tracking-tight mb-6 flex items-center">
        {title}
        <motion.div
          className="ml-2 h-1 w-6 bg-red-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 24 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
        />
      </h2>
      <MovieRow title={title} titleSize="sr-only" query={query} className="movie-row-enhanced" />
    </motion.div>
  )
}

export default Home

