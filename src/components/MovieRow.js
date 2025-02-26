// src/components/MovieRow.js
"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useBookmarks } from "../context/BookmarkContext"
import { Bookmark, Info } from "lucide-react"
import { motion } from "framer-motion"

function MovieRow({ title, titleSize = "text-2xl", query }) {
  const [movies, setMovies] = useState([])
  const { addBookmark, bookmarks } = useBookmarks()
  const apiKey = process.env.REACT_APP_MOVIE_API_KEY
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `https://${apiHost}/?s=${encodeURIComponent(query)}&r=json&page=1`
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": apiHost,
          },
        }
        const response = await fetch(url, options)
        const data = await response.json()
        setMovies(data.Search || [])
      } catch (error) {
        console.error(error)
      }
    }

    fetchMovies()
  }, [query, apiKey, apiHost])

  return (
    <div className="w-full mb-12">
      <h2 className={`${titleSize} font-bold mb-6 px-4 text-white`}>{title}</h2>
      <div className="relative">
        <div className="flex gap-4 overflow-x-scroll px-4 pb-4 scrollbar-hide">
          {movies.length > 0 ? movies.map((movie) => (
            <motion.div
              key={movie.imdbID}
              className="relative min-w-[200px] w-[200px] rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={`/movie/${movie.imdbID}`}>
                {movie.Poster && movie.Poster !== "N/A" ? (
                  <img
                    src={movie.Poster || "/placeholder.svg"}
                    alt={`Poster of ${movie.Title}`}
                    className="w-full h-[300px] object-cover lazyload"
                  />
                ) : (
                  <div className="w-full h-[300px] bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No Poster Available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{movie.Title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{movie.Year}</p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addBookmark(movie)
                        }}
                        className="text-white hover:text-yellow-400 transition-colors duration-200 focus:outline-none"
                      >
                        <Bookmark size={20} />
                      </button>
                      <Link
                        to={`/movie/${movie.imdbID}`}
                        className="text-white hover:text-blue-400 transition-colors duration-200 focus:outline-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Info size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )) : (
            <div className="text-white text-center w-full">No movies found. Please try a different search.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieRow
