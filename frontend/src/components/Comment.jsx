// import React, { useRef, useState, useEffect } from 'react';
// import { FaRegHeart, FaHeart } from "react-icons/fa";
// import { BsThreeDots } from "react-icons/bs";
// import { useFeedbackStore } from "@/components/store/feedbackStore";
// import DeleteComment from './DeleteComment';
// import { toast } from "sonner";
// import Reply from './Reply';

// const formatRelativeTime = (dateString) => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffInSeconds = Math.floor((now - date) / 1000);
  
//   if (diffInSeconds < 60) {
//     return 'just now';
//   }
  
//   const diffInMinutes = Math.floor(diffInSeconds / 60);
//   if (diffInMinutes < 60) {
//     return `${diffInMinutes} min ago`;
//   }
  
//   const diffInHours = Math.floor(diffInMinutes / 60);
//   if (diffInHours < 24) {
//     return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
//   }
  
//   const diffInDays = Math.floor(diffInHours / 24);
//   if (diffInDays < 7) {
//     return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
//   }
  
//   return date.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric'
//   });
// };

// const Comment = ({ comment, currentUserId, onEdit }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [displayTime, setDisplayTime] = useState(formatRelativeTime(comment.createdAt));
//   const dropdownRef = useRef(null);

//   const { deleteFeedback, likeFeedback, unlikeFeedback } = useFeedbackStore();

//    // Derived state from comment data
//    const isLiked = comment.likedBy.includes(currentUserId);
//    const likeCount = comment.likes;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDisplayTime(formatRelativeTime(comment.createdAt));
//     }, 60000); // Update every minute

//     return () => clearInterval(interval);
//   }, [comment.createdAt]);

//   const toggleActionDropdown = () => setDropdownOpen(!dropdownOpen);

//   const handleDelete = async () => {
//     try {
//       await deleteFeedback(comment._id);
//       toast.success("Comment deleted successfully.");
//     } catch (error) {
//       console.error("Failed to delete comment:", error);
//       toast.error("Failed to delete comment.");
//     }
//     setShowModal(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLike = async () => {
//     if (!currentUserId) {
//       toast.error("Please login to like comments");
//       return;
//     }

//     try {
//       if (isLiked) {
//         await unlikeFeedback(comment._id, currentUserId);
//       } else {
//         await likeFeedback(comment._id, currentUserId);
//       }
//     } catch (error) {
//       toast.error("Failed to update like");
//     }
//   };

//   const isCurrentUser = currentUserId === comment.userId;

//   return (
//     <div className='w-full max-w-6xl p-6 bg-white rounded-lg shadow-sm border border-gray-100 mb-4 relative'>
//       <div className='flex gap-4 items-start'>
//         <img
//           className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
//           src={comment.image}
//           alt={`${comment.name}'s profile`}
//         />

//         <div className='flex-1'>
//           <div className='flex justify-between items-start'>
//             <div>
//               <h3 className='text-lg font-semibold text-gray-800'>{comment.name}</h3>
//               <div className="flex mt-1">
//                 {[...Array(5)].map((_, i) => (
//                   <span 
//                     key={i} 
//                     className={i < comment.rating ? "text-yellow-400" : "text-gray-300"}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <p className='text-sm text-gray-500'>{displayTime}</p>
//           </div>

//           <p className='text-gray-700 mt-3 mb-4'>{comment.comment}</p>

//           <div className='flex items-center gap-6 text-gray-500  border border-black'>
//           <Reply commentId={comment._id} />

//  <button
//         className="flex items-center gap-1 hover:text-orange-500 transition-colors"
//         onClick={handleLike}
//       >
//         {isLiked ? (
//           <FaHeart className="text-lg text-orange-500" />
//         ) : (
//           <FaRegHeart className="text-lg" />
//         )}
//         <span className="text-sm">{likeCount > 0 ? likeCount : ''}</span>
//       </button>

//             {isCurrentUser && (
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   className="flex items-center gap-1 hover:text-gray-700 transition-colors"
//                   onClick={toggleActionDropdown}
//                   aria-label="Comment actions"
//                 >
//                   <BsThreeDots className="text-lg" />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute mt-2 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200">
//                     <button
//                       onClick={() => {
//                         onEdit();
//                         setDropdownOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-500 hover:text-white transition-colors"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowModal(true);
//                         setDropdownOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <DeleteComment 
//           onClose={() => setShowModal(false)} 
//           onConfirm={handleDelete} 
//         />
//       )}
//     </div>
//   );
// };

// export default Comment;


import React, { useRef, useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
import { useFeedbackStore } from "@/components/store/feedbackStore";
import { useAuthStore } from "@/components/store/authStore";
import DeleteComment from './DeleteComment';
import { toast } from "sonner";
import Reply from './Reply';

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const Comment = ({ comment, currentUserId, onEdit, onReplySubmit }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [displayTime, setDisplayTime] = useState(formatRelativeTime(comment.createdAt));
  const [isReplying, setIsReplying] = useState(false);
  const dropdownRef = useRef(null);

  const { deleteFeedback, likeFeedback, unlikeFeedback } = useFeedbackStore();

  // Derived state from comment data
  const isLiked = comment.likedBy.includes(currentUserId);
  const likeCount = comment.likes;

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTime(formatRelativeTime(comment.createdAt));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [comment.createdAt]);

  const toggleActionDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleDelete = async () => {
    try {
      await deleteFeedback(comment._id);
      toast.success("Comment deleted successfully.");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment.");
    }
    setShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLike = async () => {
    if (!currentUserId) {
      toast.error("Please login to like comments");
      return;
    }

    try {
      if (isLiked) {
        await unlikeFeedback(comment._id, currentUserId);
      } else {
        await likeFeedback(comment._id, currentUserId);
      }
    } catch (error) {
      toast.error("Failed to update like");
    }
  };

  const handleReplyClick = () => {
    if (!currentUserId) {
      toast.error("Please login to reply to comments");
      return;
    }
    setIsReplying(!isReplying);
  };

  // const handleReplySubmit = (replyText) => {
  //   onReplySubmit(comment._id, replyText);
  //   setIsReplying(false);
  // };
  const handleReplySubmit = (replyText) => {
    if (typeof onReplySubmit === 'function') {
      onReplySubmit(comment._id, replyText);
      setIsReplying(false);
    } else {
      console.error('onReplySubmit is not a function');
      toast.error('Failed to submit reply');
    }
  };
  const isCurrentUser = currentUserId === comment.userId;

  return (
    <div className='w-full max-w-6xl p-6 bg-white rounded-lg shadow-sm border border-gray-100 mb-4 relative'>
      <div className='flex gap-4 items-start'>
        <img
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
          src={comment.image}
          alt={`${comment.name}'s profile`}
        />

        <div className='flex-1'>
          <div className='flex justify-between items-start'>
            <div>
              <h3 className='text-lg font-semibold text-gray-800'>{comment.name}</h3>
              <div className="flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={i < comment.rating ? "text-yellow-400" : "text-gray-300"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className='text-sm text-gray-500'>{displayTime}</p>
          </div>

          <p className='text-gray-700 mt-3 mb-4'>{comment.comment}</p>
          
          <div className='flex gap-10'>
            <button
              className="flex items-center gap-1 hover:text-orange-500 transition-colors"
              onClick={handleReplyClick}
            >
              <FiMessageCircle className="text-lg" />
              <span className="text-sm">Reply</span>
            </button>
            
            <div className='flex items-center gap-6 text-gray-500'>
              <button
                className="flex items-center gap-1 hover:text-orange-500 transition-colors"
                onClick={handleLike}
              >
                {isLiked ? (
                  <FaHeart className="text-lg text-orange-500" />
                ) : (
                  <FaRegHeart className="text-lg" />
                )}
                <span className="text-sm">{likeCount > 0 ? likeCount : ''}</span>
              </button>

              {isCurrentUser && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                    onClick={toggleActionDropdown}
                    aria-label="Comment actions"
                  >
                    <BsThreeDots className="text-lg" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute mt-2 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                      <button
                        onClick={() => {
                          onEdit();
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-500 hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Reply form appears below the actions */}
          {isReplying && (
            <Reply 
              onCancel={() => setIsReplying(false)}
              onSubmit={handleReplySubmit}
            />
          )}
        </div>
      </div>

      {showModal && (
        <DeleteComment 
          onClose={() => setShowModal(false)} 
          onConfirm={handleDelete} 
        />
      )}
    </div>
  );
};

export default Comment;