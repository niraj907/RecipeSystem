import React, { useState } from 'react';
import { useAuthStore } from "@/components/store/authStore";
import { toast } from "sonner";

const Reply = ({ onCancel, onSubmit }) => {
  const [replyText, setReplyText] = useState('');
  const { user } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      toast.error("Please write a reply before submitting");
      return;
    }
    
    // Console.log the reply text before submitting
    console.log("Submitting reply:", replyText); 
    
    // Call the onSubmit prop with the reply text
    onSubmit(replyText);
    setReplyText('');
  };

  return (
    <div className="mt-4 pl-4 border-l-2 border-gray-200">
      <form onSubmit={handleSubmit} className="flex gap-3 items-start">
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
              onClick={onCancel}
              className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reply;