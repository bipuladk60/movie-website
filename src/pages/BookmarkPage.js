// import React from 'react';
// import Header from '../components/Header';
// import { useBookmarks } from '../context/BookmarkContext';
// import { useNavigate } from 'react-router-dom';

// function BookmarkPage() {
//   const { bookmarks, removeBookmark, toggleWatched } = useBookmarks();
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <Header />
//       <div className="p-4">
//         <h2 className="text-2xl font-bold mb-4">Bookmarked Movies</h2>
//         {bookmarks.length === 0 ? (
//           <p>No bookmarks yet.</p>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
//             {bookmarks.map((movie) => (
//               <div
//                 key={movie.imdbID}
//                 className="bg-gray-800 rounded overflow-hidden"
//               >
//                 {movie.Poster && (
//                   <img
//                     src={movie.Poster}
//                     alt={movie.Title}
//                     className="w-full h-60 object-cover cursor-pointer"
//                     onClick={() => navigate(`/movie/${movie.imdbID}`)}
//                   />
//                 )}
//                 <div className="p-2">
//                   <h3 className="text-sm font-semibold">{movie.Title}</h3>
//                   <label className="inline-flex items-center mb-2 gap-1 mt-1">
//                     <input
//                       type="checkbox"
//                       checked={movie.watched}
//                       onChange={() => toggleWatched(movie.imdbID)}
//                     />
//                     <span className="text-xs">Watched</span>
//                   </label>
//                   <button
//                     onClick={() => removeBookmark(movie.imdbID)}
//                     className="bg-red-500 text-white px-2 py-1 text-xs rounded mt-2"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BookmarkPage;
