import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleWatched = (movieId) => {
    try {
      let updatedMovies = storedValue.map((movie) =>
        movie.id === movieId ? { ...movie, watched: !movie.watched } : movie
      );
      setStoredValue(updatedMovies);
      window.localStorage.setItem(key, JSON.stringify(updatedMovies));
    } catch (error) {
      console.error("Error updating watched status:", error);
    }
  };

  return [storedValue, setValue, toggleWatched];
}

export default useLocalStorage;
