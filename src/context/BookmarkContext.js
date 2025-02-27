// src/context/BookmarkContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Trash, Eye } from "lucide-react";

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const storedBookmarks = localStorage.getItem("bookmarkedMovies");
      return storedBookmarks ? JSON.parse(storedBookmarks) : [];
    } catch (error) {
      console.error("Error reading from local storage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("bookmarkedMovies", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (movie) => {
    setBookmarks((prev) => {
      if (!prev.some((m) => m.imdbID === movie.imdbID)) {
        return [...prev, { ...movie, watched: false }];
      }
      return prev;
    });
  };

  const removeBookmark = (movieId) => {
    setBookmarks((prev) => prev.filter((movie) => movie.imdbID !== movieId));
  };

  const toggleWatched = (movieId) => {
    setBookmarks((prev) =>
      prev.map((movie) =>
        movie.imdbID === movieId ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, toggleWatched }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}

// Animated Bookmark Button Component
export function BookmarkButton({ isBookmarked, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out shadow-lg text-lg ${
        isBookmarked ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-800 hover:bg-gray-700 text-white"
      }`}
    >
      <Bookmark size={22} />
      {isBookmarked ? "Bookmarked" : "Add Bookmark"}
    </motion.button>
  );
}

// Animated Remove Bookmark Button Component
export function RemoveBookmarkButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition duration-300 ease-in-out shadow-lg text-lg"
    >
      <Trash size={22} />
      Remove
    </motion.button>
  );
}

// Animated Toggle Watched Button Component
export function ToggleWatchedButton({ isWatched, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out shadow-lg text-lg ${
        isWatched ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-800 hover:bg-gray-700 text-white"
      }`}
    >
      <Eye size={22} />
      {isWatched ? "Watched" : "Mark as Watched"}
    </motion.button>
  );
}
