"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useBookmarks } from "../context/BookmarkContext"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, X, Film } from "lucide-react"

function Bookmarks() {
  const { bookmarks, removeBookmark, toggleWatched } = useBookmarks()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading for smooth animations
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <BookmarksLoading />
  }

  if (bookmarks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-64 p-8 text-center"
      >
        <Film size={48} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-medium mb-2">No bookmarked movies yet</h2>
        <p className="text-sm text-gray-500 max-w-md">
          Start exploring movies and save your favorites to see them here.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold tracking-tight mb-6 text-gray-400 dark:text-gray-400">My Collection</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <AnimatePresence>
          {bookmarks.map((movie, index) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              index={index}
              onRemove={removeBookmark}
              onToggleWatched={toggleWatched}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function MovieCard({ movie, index, onRemove, onToggleWatched }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden bg-gray-200 dark:bg-gray-700">
          {movie.Poster ? (
            <img
              src={movie.Poster || "/placeholder.svg"}
              alt={movie.Title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Film size={32} />
            </div>
          )}

          {/* Watched badge */}
          {movie.watched && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Watched</div>
          )}

          {/* Hover overlay with actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <ActionButton
                onClick={(e) => {
                  e.preventDefault()
                  onToggleWatched(movie.imdbID)
                }}
                title={movie.watched ? "Mark as unwatched" : "Mark as watched"}
              >
                {movie.watched ? <EyeOff size={16} /> : <Eye size={16} />}
              </ActionButton>

              <ActionButton
                onClick={(e) => {
                  e.preventDefault()
                  onRemove(movie.imdbID)
                }}
                title="Remove from bookmarks"
                className="bg-red-500 hover:bg-red-600"
              >
                <X size={16} />
              </ActionButton>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-3">
        <Link to={`/movie/${movie.imdbID}`} className="block">
          <h3 className="font-medium text-sm truncate dark:text-gray-100">{movie.Title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{movie.Year}</p>
        </Link>
      </div>
    </motion.div>
  )
}

function ActionButton({ children, onClick, title, className = "bg-gray-800 hover:bg-gray-700" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      title={title}
      className={`${className} text-white p-2 rounded-full flex items-center justify-center`}
    >
      {children}
    </motion.button>
  )
}

function BookmarksLoading() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="rounded-lg overflow-hidden">
            <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bookmarks

