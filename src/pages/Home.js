import React, { useEffect, useState } from 'react';
import MovieRow from '../components/MovieRow';

function Home() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const apiHost = process.env.REACT_APP_MOVIE_API_HOST;
  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const url = 'https://movie-database-alternative.p.rapidapi.com/?s=Avengers&r=json&page=1';
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost,
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        setFeaturedMovies(data.Search || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeaturedMovies();
  }, []);

  useEffect(() => {
    if (featuredMovies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length);
      }, 5000); // Change movie every 5 seconds
      return () => clearInterval(interval);
    }
  }, [featuredMovies]);

  const featured = featuredMovies[currentIndex];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      {featured && (
        <div
          className="relative w-full h-[90vh] bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${featured.Poster})`,
          }}
        >
          <div className="p-8 max-w-lg">
            <h1 className="text-5xl font-bold mb-4">{featured.Title}</h1>
            <p className="text-lg mb-6">
              Experience the journey of the Avengers in their fight against Thanos.
            </p>
            <div className="flex space-x-4">
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold">
                Bookmark
              </button>
              <button className="bg-white text-black px-6 py-2 rounded-lg font-bold">
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <div className="p-4">
        <MovieRow title="Trending Now" titleSize="text-3xl" query="Avengers" />
        <MovieRow title="Action" titleSize="text-3xl" query="Batman" />
        <MovieRow title="Romantic" titleSize="text-3xl" query="Love" />
        <MovieRow title="Comedy" titleSize="text-3xl" query="Comedy" />
      </div>
    </div>
  );
}

export default Home;
