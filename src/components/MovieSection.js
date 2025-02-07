"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Film, Calendar, Info } from "lucide-react"

function MovieSection({ sectionTitle, query }) {
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return
      const url = `https://${apiHost}/?s=${encodeURIComponent(query)}&r=json&page=1`
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": apiHost,
        },
      }
      try {
        const res = await fetch(url, options)
        const data = await res.json()
        setMovies(data.Search || [])
      } catch (e) {
        console.error(e)
      }
    }
    fetchMovies()
  }, [query, apiKey, apiHost])

  return (
    <section className="px-4 mb-12">
      <h2 className="text-2xl font-bold mb-6 text-white">{sectionTitle}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <motion.div
            key={movie.imdbID}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(`/movie/${movie.imdbID}`)}
          >
            <div className="relative">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img src={movie.Poster || "/placeholder.svg"} alt={movie.Title} className="w-full h-64 object-cover" />
              ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
                  <Film size={48} className="text-gray-500" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Info size={24} className="text-white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">{movie.Title}</h3>
              <div className="flex items-center text-gray-400 text-xs">
                <Calendar size={12} className="mr-1" />
                <span>{movie.Year}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default MovieSection

