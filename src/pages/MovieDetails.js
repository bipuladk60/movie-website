"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useBookmarks } from "../context/BookmarkContext"
import { motion, AnimatePresence } from "framer-motion"
import { Bookmark, Calendar, Clock, Star, Users, Film } from "lucide-react"

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { addBookmark, bookmarks, removeBookmark } = useBookmarks()

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const url = `https://${apiHost}/?r=json&i=${id}`
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": apiHost,
          },
        }
        const res = await fetch(url, options)
        const data = await res.json()
        setMovie(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDetails()
  }, [id, apiKey, apiHost])

  if (isLoading) return <MovieDetailsSkeleton />

  const isBookmarked = bookmarks.some((item) => item.imdbID === movie.imdbID)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                {movie.Poster && movie.Poster !== "N/A" ? (
                  <img
                    src={movie.Poster || "/placeholder.svg"}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Film size={64} className="text-gray-400 dark:text-gray-500" />
                  </div>
                )}
              </div>
              <div className="md:w-2/3 p-6 md:p-8">
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{movie.Title}</h1>
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <InfoTag icon={<Calendar size={14} />} text={movie.Year} />
                  <InfoTag icon={<Clock size={14} />} text={movie.Runtime} />
                  <InfoTag icon={<Star size={14} />} text={`${movie.imdbRating}/10`} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{movie.Plot}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <InfoSection title="Genre" content={movie.Genre} />
                  <InfoSection title="Director" content={movie.Director} />
                  <InfoSection title="Writers" content={movie.Writer} />
                  <InfoSection title="Cast" content={movie.Actors} icon={<Users size={16} />} />
                </div>
                <BookmarkButton
                  isBookmarked={isBookmarked}
                  onClick={() => (isBookmarked ? removeBookmark(movie.imdbID) : addBookmark(movie))}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function InfoTag({ icon, text }) {
  return (
    <div className="flex items-center">
      {icon}
      <span className="ml-1">{text}</span>
    </div>
  )
}

function InfoSection({ title, content, icon }) {
  return (
    <div>
      <h2 className="text-sm font-semibold mb-1 text-gray-900 dark:text-white flex items-center">
        {icon && <span className="mr-1">{icon}</span>}
        {title}
      </h2>
      <p className="text-sm text-gray-700 dark:text-gray-300">{content}</p>
    </div>
  )
}

function BookmarkButton({ isBookmarked, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        isBookmarked
          ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
          : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
      }`}
    >
      <Bookmark className="mr-2" size={16} />
      {isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
    </motion.button>
  )
}

function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-200 dark:bg-gray-700 animate-pulse" style={{ height: "400px" }}></div>
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="flex gap-4 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                ))}
              </div>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails

