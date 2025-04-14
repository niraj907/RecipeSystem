import React, { useState } from 'react'
import { FiMessageCircle } from "react-icons/fi";
import { useAuthStore } from "@/components/store/authStore";

const Reply = ({ commentId }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const { user } = useAuthStore();

  const handleReplyClick = () => {
    if (!user) {
      alert('Please login to reply to comments');
      return;
    }
    setIsReplying(!isReplying);
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim()) {
      alert('Please write a reply before submitting');
      return;
    }
    
    try {
      // Here you would typically call your API to post the reply
      console.log('Posting reply:', {
        commentId,
        text: replyText,
        userId: user._id
      });
      
      // Reset after successful submission
      setReplyText('');
      setIsReplying(false);
    } catch (error) {
      console.error('Failed to post reply:', error);
    }
  };

  return (
    <div className="relative bg-red-500">
      <button
        className="flex items-center gap-1 hover:text-orange-500 transition-colors"
        onClick={handleReplyClick} 
      >
        <FiMessageCircle className="text-lg" />
        <span className="text-sm">Reply</span>
      </button>

      {isReplying && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200">
          <div className="flex gap-3 items-start">
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
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSubmitReply}
                  className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Post Reply
                </button>
                <button
                  onClick={() => setIsReplying(false)}
                  className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reply