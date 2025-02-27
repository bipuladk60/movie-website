import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send } from "lucide-react";
import { useBookmarks } from "../context/BookmarkContext"; // Import bookmark context
import ReactMarkdown from "react-markdown"; // Import Markdown parser

// Initialize Gemini AI with API key
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

function AIBot() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hi! Tell me your favorite movies, and I'll recommend similar ones!" },
  ]);
  const [input, setInput] = useState("");
  const { bookmarks } = useBookmarks(); // Get bookmarked movies from context

  useEffect(() => {
    if (bookmarks.length > 0) {
      const genres = [...new Set(
        bookmarks.flatMap(movie => (movie.Genre ? movie.Genre.split(", ") : []))
      )].join(", ");
      
      if (genres) {
        getRecommendations(genres);
      }
    }
  }, [bookmarks]); // Re-fetch recommendations if bookmarks change

  async function getRecommendations(genres) {
    let prompt = genres
      ? `I have watched and liked movies in these genres: ${genres}. Recommend 2-3 movies in short, categorized lists. Use Markdown formatting for readability.`
      : "I don't have any bookmarked movies. Suggest some great films based on a genre I choose.";

    const response = await fetchGeminiResponse(prompt);
    addMessage("assistant", response);
  }

  async function fetchGeminiResponse(prompt) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "⚠️ Sorry, I couldn't fetch recommendations at the moment.";
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    addMessage("user", input);

    const response = await fetchGeminiResponse(input);
    addMessage("assistant", response);
    setInput("");
  };

  function addMessage(role, content) {
    setMessages(prevMessages => [...prevMessages, { role, content }]);
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-3 text-center">🎬 Movie Recommender</h2>
      <div className="h-72 overflow-y-auto border border-gray-700 p-3 rounded-lg space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg text-sm leading-relaxed ${
              msg.role === "user" ? "bg-blue-600 text-white text-right" : "bg-gray-800 text-left"
            }`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
      </div>
      <div className="flex mt-3">
        <input
          type="text"
          className="flex-grow bg-gray-800 border border-gray-700 text-white p-2 rounded-lg focus:outline-none text-sm"
          placeholder="Ask me for movie recommendations..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default AIBot;
