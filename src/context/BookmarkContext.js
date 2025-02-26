// src/context/BookmarkContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

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
