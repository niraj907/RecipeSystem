import React, { useRef, useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
import { useFeedbackStore } from "@/components/store/feedbackStore";
import { useAuthStore } from "@/components/store/authStore";
import { useReplyStore } from "@/components/store/replyStore";
import { toast } from "sonner";

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const Comment = ({ comment, currentUserId, onEdit, onReplySubmit }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [displayTime, setDisplayTime] = useState(() => formatRelativeTime(comment.createdAt));
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const dropdownRef = useRef(null);

  const { user } = useAuthStore();
  const { deleteFeedback, likeFeedback, unlikeFeedback } = useFeedbackStore();
  const { 
    replies, 
    fetchReplies, 
    createReply, 
    deleteReply, 
    likeReply, 
    unlikeReply, 
  
  } = useReplyStore();

  const isLiked = comment.likedBy?.includes(currentUserId) || false;
  const likeCount = comment.likes || 0;
  const isCurrentUser = currentUserId === comment.userId;

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTime(formatRelativeTime(comment.createdAt));
    }, 60000);

    return () => clearInterval(interval);
  }, [comment.createdAt]);

  useEffect(() => {
    fetchReplies(comment._id);
  }, [comment._id, fetchReplies]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const commentReplies = replies[comment._id] || [];

  const handleDelete = async () => {
    try {
      await deleteFeedback(comment._id);
      toast.success("Comment deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete comment.");
    }
  };

  const handleLike = async () => {
    if (!currentUserId) return toast.error("Please login to like comments");
    
    try {
      isLiked ? await unlikeFeedback(comment._id, currentUserId) 
             : await likeFeedback(comment._id, currentUserId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update like");
    }
  };

  const handleReplyLike = async (replyId) => {
    if (!currentUserId) return toast.error("Please login to like replies");
    
    const reply = commentReplies.find(r => r._id === replyId);
    if (!reply) return;
    
    const isLiked = reply.likedBy?.includes(currentUserId) || false;
    
    try {
      if (isLiked) {
        await unlikeReply(replyId, comment._id, currentUserId);
      } else {
        await likeReply(replyId, comment._id, currentUserId);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update reply like");
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      await deleteReply(replyId, comment._id);
      toast.success("Reply deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete reply");
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return toast.error("Please write a reply");
    onReplySubmit(comment._id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className='w-full max-w-6xl p-6 bg-white rounded-lg shadow-sm border border-gray-100 mb-4 relative'>
      <div className='flex gap-4 items-start'>
        <img
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
          src={comment.image || "https://github.com/shadcn.png"}
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
              onClick={() => currentUserId ? setIsReplying(!isReplying) : toast.error("Please login to reply")}
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
                <span className="text-sm">{likeCount || ''}</span>
              </button>

              {isCurrentUser && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <BsThreeDots className="text-lg" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute mt-2 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                      <button
                        onClick={() => { onEdit(); setDropdownOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-500 hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => { handleDelete(); setDropdownOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {isReplying && (
            <div className="mt-4 pl-4 border-l-2 border-gray-200">
              <form onSubmit={handleReplySubmit} className="flex gap-3 items-start">
                <img
                  src={user?.images?.[0]?.url || "https://github.com/shadcn.png"}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full mt-2"
                />
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                    rows="2"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                      Post Reply
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsReplying(false)}
                      className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {commentReplies.length > 0 && (
            <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-4">
              {commentReplies.map((reply) => {
                const isReplyLiked = reply.likedBy?.includes(currentUserId) || false;
                const replyLikeCount = reply.likes || 0;
                
                return (
                  <div key={reply._id} className="flex gap-4 items-start">
                    <img
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                      src={reply.image || "https://github.com/shadcn.png"}
                      alt={`${reply.name}'s profile`}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className='text-sm font-semibold text-gray-800'>
                          {reply.name || "Anonymous"}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className='text-xs text-gray-500'>
                            {formatRelativeTime(reply.createdAt)}
                          </p>
                          {reply.userId === currentUserId && (
                            <button
                              onClick={() => handleDeleteReply(reply._id)}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                      <p className='text-gray-600 text-sm mt-1'>{reply.comment}</p>

                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleReplyLike(reply._id)}
                          className="flex items-center gap-1 text-gray-500 hover:text-orange-500"
                          disabled={!currentUserId}
                        >
                          {isReplyLiked ? (
                            <FaHeart className="text-orange-500" />
                          ) : (
                            <FaRegHeart />
                          )}
                          <span className="text-xs">
                            {replyLikeCount > 0 ? replyLikeCount : ''}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

   
    </div>
  );
};

export default Comment;