// import React, { useState } from 'react';
// import { useBookmarks } from '../context/BookmarkContext';

// function BookmarkList() {
//   const { bookmarks, removeBookmark, toggleWatched, updateReview } = useBookmarks();
//   const [editingReviewId, setEditingReviewId] = useState(null);
//   const [tempReview, setTempReview] = useState('');

//   const handleEditReview = (imdbID, currentReview) => {
//     setEditingReviewId(imdbID);
//     setTempReview(currentReview);
//   };

//   const handleSaveReview = (imdbID) => {
//     updateReview(imdbID, tempReview);
//     setEditingReviewId(null);
//     setTempReview('');
//   };

//   if (bookmarks.length === 0) {
//     return <p>No bookmarks yet.</p>;
//   }

//   return (
//     <div className="mb-6">
//       <h2 className="text-2xl mb-4 font-bold">Bookmarked Movies</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {bookmarks.map((movie) => (
//           <div
//             key={movie.imdbID}
//             className="bg-white text-black p-4 rounded shadow flex flex-col"
//           >
//             <h3 className="font-bold mb-1">{movie.Title}</h3>
//             <p className="mb-2">{movie.Year}</p>
//             {movie.Poster && (
//               <img
//                 src={movie.Poster}
//                 alt={movie.Title}
//                 className="mb-2 w-full h-auto"
//               />
//             )}

//             {/* Watched toggle */}
//             <label className="inline-flex items-center mb-2 gap-2">
//               <input
//                 type="checkbox"
//                 checked={movie.watched}
//                 onChange={() => toggleWatched(movie.imdbID)}
//               />
//               <span>Watched</span>
//             </label>

//             {/* Reviews */}
//             {editingReviewId === movie.imdbID ? (
//               <div className="mb-2">
//                 <textarea
//                   value={tempReview}
//                   onChange={(e) => setTempReview(e.target.value)}
//                   className="w-full p-2 text-black rounded mb-2"
//                 />
//                 <button
//                   className="bg-black text-white px-2 py-1 rounded font-semibold mr-2"
//                   onClick={() => handleSaveReview(movie.imdbID)}
//                 >
//                   Save
//                 </button>
//                 <button
//                   className="bg-gray-500 text-white px-2 py-1 rounded font-semibold"
//                   onClick={() => setEditingReviewId(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <div className="mb-2">
//                 <p>
//                   <strong>Review:</strong> {movie.review || 'No review yet.'}
//                 </p>
//                 <button
//                   className="bg-black text-white px-2 py-1 rounded font-semibold mt-1"
//                   onClick={() => handleEditReview(movie.imdbID, movie.review)}
//                 >
//                   Edit Review
//                 </button>
//               </div>
//             )}

//             <button
//               className="bg-red-500 text-white px-2 py-1 rounded font-semibold mt-auto"
//               onClick={() => removeBookmark(movie.imdbID)}
//             >
//               Remove Bookmark
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default BookmarkList;
