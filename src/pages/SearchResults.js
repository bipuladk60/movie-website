import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Calendar, Search } from "lucide-react";

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST;

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `https://${apiHost}/?s=${encodeURIComponent(
          query
        )}&r=json&page=1`;
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": apiHost,
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        setMovies(data.Search || []);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, apiKey, apiHost]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 flex items-center text-gray-400">
          <Search className="mr-2" size={24} />
          Search Results for "{query}"
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <p className="text-center text-xl">{error}</p>
        ) : movies.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {movies.map((movie) => (
              <motion.div
                key={movie.imdbID}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(255, 255, 255, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="flex flex-col"
              >
                <Link
                  to={`/movie/${movie.imdbID}`}
                  className="bg-gray-800 rounded-lg overflow-hidden transition duration-300 ease-in-out block flex flex-col h-full"
                >
                  <div className="relative aspect-w-2 aspect-h-3">
                    {movie.Poster && movie.Poster !== "N/A" ? (
                      <img
                        src={movie.Poster || "/placeholder.svg"}
                        alt={movie.Title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <Film size={48} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col justify-between h-full">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {movie.Title}
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {movie.Year}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-xl">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
