import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { BookmarkProvider } from "./context/BookmarkContext"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Bookmarks from "./pages/Bookmarks"
import MovieDetails from "./pages/MovieDetails"
import SearchResults from "./pages/SearchResults"
import Preloader from "./components/Preloader" // Import Preloader
import AIBot from "./components/AIBot" // Import AI Bot
import { MessageCircle, X } from "lucide-react" // Import icons

function App() {
  const [showPreloader, setShowPreloader] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false) // Chatbot state

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
        <div className="bg-black min-h-screen text-white relative">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>

          {/* Floating Chatbot Button */}
          <button
            onClick={() => setShowChatbot(!showChatbot)}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
          >
            {showChatbot ? <X size={24} /> : <MessageCircle size={24} />}
          </button>

          {/* Show AI Chatbot when toggled */}
          {showChatbot && (
            <div className="fixed bottom-20 right-6 bg-gray-900 p-4 rounded-lg shadow-lg w-80 h-auto z-50">
              <AIBot />
            </div>
          )}
        </div>
      )}
    </BookmarkProvider>
  )
}

export default App
