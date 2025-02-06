import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useLocalStorage('movieBookmarks', []);

  const addBookmark = (movie) => {
    if (!bookmarks.find((item) => item.imdbID === movie.imdbID)) {
      setBookmarks([...bookmarks, { ...movie, watched: false, review: '' }]);
    }
  };

  const removeBookmark = (imdbID) => {
    setBookmarks(bookmarks.filter((item) => item.imdbID !== imdbID));
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
