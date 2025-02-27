import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Home, Bookmark, Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function NavBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const navigate = useNavigate();
    const searchInputRef = useRef(null); // Ref to the search input
    const suggestionsRef = useRef(null); // Ref to the suggestions list

    const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
    const apiHost = process.env.REACT_APP_MOVIE_API_HOST;

    useEffect(() => {
        if (!searchTerm.trim()) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const url = `https://${apiHost}/?s=${encodeURIComponent(searchTerm)}&r=json&page=1`;
                const options = {
                    method: "GET",
                    headers: {
                        "x-rapidapi-key": apiKey,
                        "x-rapidapi-host": apiHost,
                    },
                };
                const response = await fetch(url, options);
                const data = await response.json();
                if (data.Search) {
                    setSuggestions(data.Search);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error("Network error:", error);
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [searchTerm, apiKey, apiHost]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
            setIsSearchExpanded(false); // Close search and suggestions after search
            setSearchTerm("");
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (movieID) => {
        navigate(`/movie/${movieID}`);
        setIsSearchExpanded(false); // Close search and suggestions after selection
        setSearchTerm("");
        setSuggestions([]);
    };

    const toggleSearch = () => {
        setIsSearchExpanded((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSearchExpanded &&
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target) &&
                (!suggestionsRef.current || !suggestionsRef.current.contains(event.target))
            ) {
                setIsSearchExpanded(false); // Close suggestions on outside click
                setSuggestions([]); // Optionally clear suggestions as well
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Cleanup on component unmount
        };
    }, [isSearchExpanded]);

    return (
        <header className="w-full bg-black shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
                <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200">
                    <Film className="size-19 "/>
                    <span className="text-md md:text-xl font-semibold">MovieApp</span>
                </Link>

                <div className="flex-1 mx-4 relative">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search for movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-800 border-b border-gray-700 text-white py-2 px-4 focus:outline-none focus:border-blue-500 w-full placeholder-gray-500 rounded-3xl" // Streamlined Tailwind CSS input styles
                            ref={searchInputRef} // Attach ref to input
                            onFocus={() => setIsSearchExpanded(true)} // Open suggestions on focus
                        />
                        <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Search size={20} />
                        </button>
                        <AnimatePresence>
                            {isSearchExpanded && suggestions.length > 0 && ( // Conditionally render suggestions based on isSearchExpanded
                                <motion.ul
                                    ref={suggestionsRef} // Attach ref to ul
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute left-0 mt-2 w-full bg-gray-800 rounded-md shadow-lg z-50 overflow-y-auto max-h-60 border border-gray-700" // Tailwind CSS suggestion styles
                                >
                                    {suggestions.map((movie) => (
                                        <motion.li
                                            key={movie.imdbID}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors duration-150 text-white" // Tailwind CSS suggestion item styles
                                            onClick={() => handleSelectSuggestion(movie.imdbID)}
                                            whileHover={{ backgroundColor: "#374151" }}
                                        >
                                            {movie.Title}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </form>
                </div>

                <nav className="flex items-center space-x-4">
                    <Link to="/" className="text-gray-300 hover:text-white transition">
                        <Home size={20} />
                    </Link>
                    <Link to="/bookmarks" className="text-gray-300 hover:text-white transition">
                        <Bookmark size={20} />
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;