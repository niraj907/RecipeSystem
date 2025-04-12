import React, { useRef, useState, useEffect } from 'react';
import { FiMessageCircle } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useFeedbackStore } from "@/components/store/feedbackStore";

const Comment = ({ comment, currentUserId, onEdit }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes || 0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { deleteFeedback } = useFeedbackStore();

  const toggleActionDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteFeedback(comment._id);
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formattedTime = new Date(comment.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const isCurrentUser = currentUserId === comment.userId;

  return (
    <div className='w-full max-w-6xl p-6 bg-white rounded-lg shadow-sm border border-gray-100 mb-4 relative'>
      <div className='flex gap-4 items-start'>
        <img
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
          src={comment.image}
          alt="User profile"
        />

        <div className='flex-1'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-lg font-semibold text-gray-800'>{comment.name}</h3>
              <div className="flex mt-1">
                {[...Array(comment.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
                {[...Array(5 - comment.rating)].map((_, i) => (
                  <span key={i + comment.rating} className="text-gray-300 text-lg">★</span>
                ))}
              </div>
            </div>
            <p className='text-sm text-gray-500'>{formattedTime}</p>
          </div>

          <p className='text-gray-700 mt-3 mb-4'>{comment.comment}</p>

          <div className='flex items-center gap-6 text-gray-500'>
            <button
              className="flex items-center gap-1 hover:text-orange-500 transition-colors"
              onClick={() => console.log('Reply clicked')}
            >
              <FiMessageCircle className="text-lg" />
              <span className="text-sm">Reply</span>
            </button>

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
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-500 hover:text-white cursor-pointer rounded-t-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white cursor-pointer rounded-b-md"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;