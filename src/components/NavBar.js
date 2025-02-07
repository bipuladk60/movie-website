import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, X, Home, Bookmark, Film } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const navigate = useNavigate()

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([])
      return
    }

    const fetchSuggestions = async () => {
      try {
        const url = `https://${apiHost}/?s=${encodeURIComponent(searchTerm)}&r=json&page=1`
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": apiHost,
          },
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (data.Response === "True") {
          setSuggestions(data.Search || [])
        } else {
          setSuggestions([])
          console.error("API Error:", data.Error || "Unknown error")
        }
      } catch (error) {
        setSuggestions([])
        console.error("Network error:", error)
      }
    }

    fetchSuggestions()
  }, [searchTerm, apiKey, apiHost])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`)
      setSearchTerm("")
      setSuggestions([])
      setIsSearchExpanded(false)
    }
  }

  const handleSelectSuggestion = (movieID) => {
    navigate(`/movie/${movieID}`)
    setSearchTerm("")
    setSuggestions([])
    setIsSearchExpanded(false)
  }

  const toggleSearch = () => {
    setIsSearchExpanded((prev) => !prev)
    if (!isSearchExpanded) {
      setTimeout(() => document.getElementById("mobileSearchInput")?.focus(), 100)
    }
  }

  const handleCancelSearch = () => {
    setSearchTerm("")
    setSuggestions([])
    setIsSearchExpanded(false)
  }

  return (
    <header className="w-full bg-black shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <Film size={24} />
          <span className="text-xl font-semibold">MovieApp</span>
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="flex-1 mx-4">
          <div className="hidden md:block relative">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-transparent text-white border-b border-gray-600 focus:border-white transition-colors duration-200 focus:outline-none"
                placeholder="Search for movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bg-gray-800 text-white w-full rounded-lg shadow-lg mt-1 z-50 overflow-y-auto max-h-60"
                >
                  {suggestions.map((movie) => (
                    <li
                      key={movie.imdbID}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors duration-150"
                      onClick={() => handleSelectSuggestion(movie.imdbID)}
                    >
                      {movie.Title}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden">
            <AnimatePresence>
              {isSearchExpanded ? (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="relative"
                >
                  <form onSubmit={handleSearch} className="flex items-center">
                    <Search className="absolute left-3 text-gray-400" size={20} />
                    <input
                      id="mobileSearchInput"
                      type="text"
                      className="w-full pl-10 pr-10 py-2 bg-transparent text-white border-b border-gray-600 focus:border-white transition-colors duration-200 focus:outline-none"
                      placeholder="Search for movies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleCancelSearch}
                      className="absolute right-3 text-gray-400 focus:outline-none"
                    >
                      <X size={20} />
                    </button>
                  </form>

                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bg-gray-800 text-white w-full rounded-lg shadow-lg mt-1 z-50 overflow-y-auto max-h-60"
                      >
                        {suggestions.map((movie) => (
                          <li
                            key={movie.imdbID}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors duration-150"
                            onClick={() => handleSelectSuggestion(movie.imdbID)}
                          >
                            {movie.Title}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <button
                  onClick={toggleSearch}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Search size={20} />
                </button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center"
          >
            <Home size={20} className="md:mr-2" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <Link
            to="/bookmarks"
            className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center justify-center"
          >
            <Bookmark size={20} className="md:mr-2" />
            <span className="hidden md:inline">Bookmarks</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
