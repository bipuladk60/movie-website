// import React, { useState } from 'react';
// import { useBookmarks } from '../context/BookmarkContext';
// import { Input, Button, Card, Pagination } from 'shadcn'; // Ensure these are actual Shadcn components

// function MovieSearch() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
//   const apiHost = process.env.REACT_APP_MOVIE_API_HOST;

//   const { addBookmark, bookmarks, removeBookmark } = useBookmarks();

//   const handleSearch = async (newPage = 1) => {
//     if (!searchTerm.trim()) return;
//     setLoading(true);
//     setPage(newPage);
//     setError('');

//     const url = `https://${apiHost}/?s=${encodeURIComponent(searchTerm)}&r=json&page=${newPage}`;
//     const options = {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': apiKey,
//         'x-rapidapi-host': apiHost
//       }
//     };

//     try {
//       const response = await fetch(url, options);
//       const result = await response.json();
//       setMovies(result.Search || []);
//       setTotalResults(parseInt(result.totalResults || '0', 10));
//     } catch (error) {
//       console.error(error);
//       setError('Failed to fetch movies. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mb-6">
//       <h2 className="text-2xl mb-4 font-bold">Search Movies</h2>
//       <div className="flex flex-wrap gap-2 mb-4">
//         <Input
//           className="flex-1 p-2 rounded"
//           type="text"
//           placeholder="Type a movie..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//         />
//         <Button
//           onClick={() => handleSearch()}
//           disabled={loading}
//         >
//           Search
//         </Button>
//       </div>
//       {error && <p className="text-red-500">{error}</p>}
//       {movies.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {movies.map((movie) => (
//             <Card key={movie.imdbID} className="p-4 rounded shadow">
//               <h3 className="font-bold mb-1">{movie.Title}</h3>
//               <p className="mb-2">{movie.Year}</p>
//               <img
//                 src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
//                 alt={`Poster of ${movie.Title}`}
//                 className="mb-2 w-full h-auto"
//               />
//               <Button
//                 onClick={() => isBookmarked(movie.imdbID) ? removeBookmark(movie.imdbID) : addBookmark(movie)}
//                 className={`mt-auto ${isBookmarked(movie.imdbID) ? 'bg-red-500' : 'bg-black'} text-white px-2 py-1 rounded`}
//               >
//                 {isBookmarked(movie.imdbID) ? 'Remove Bookmark' : 'Bookmark'}
//               </Button>
//             </Card>
//           ))}
//         </div>
//       )}
//       {totalResults > 10 && (
//         <Pagination
//           current={page}
//           total={Math.ceil(totalResults / 10)}
//           onChange={newPage => handleSearch(newPage)}
//         />
//       )}
//     </div>
//   );
// }

// export default MovieSearch;
