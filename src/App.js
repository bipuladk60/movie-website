// App.js
import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { BookmarkProvider } from "./context/BookmarkContext"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Bookmarks from "./pages/Bookmarks"
import MovieDetails from "./pages/MovieDetails"
import SearchResults from "./pages/SearchResults"
import Preloader from "./components/Preloader" // Import Preloader

function App() {
  const [showPreloader, setShowPreloader] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited")
    if (!hasVisited) {
      setShowPreloader(true)
    }
  }, [])

  return (
    <BookmarkProvider>
      {showPreloader ? (
        <Preloader onComplete={() => setShowPreloader(false)} />
      ) : (
        <div className="bg-black min-h-screen text-white">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      )}
    </BookmarkProvider>
  )
}

export default App
