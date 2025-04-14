import React, { useEffect, useState } from 'react';
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";
import Comment from './Comment';
import { useFeedbackStore } from "@/components/store/feedbackStore";
import { useAuthStore } from "@/components/store/authStore";
import { toast } from "sonner";

const Feedback = ({ recipeId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const { user } = useAuthStore();
  const { 
    feedback, 
    createFeedback, 
    editFeedback,
    fetchFeedback, 
    loading,
    error 
  } = useFeedbackStore();

 

  useEffect(() => {
    if (!recipeId) {
      console.error("No recipeId provided to Feedback component");
      return;
    }
    fetchFeedback(recipeId);
  }, [recipeId, fetchFeedback]);

  const handleSubmit = async () => {
    if (!recipeId) {
       toast.error("Recipe ID is missing");
      return;
    }

    if (!user) {
       toast.error("Please login to submit feedback");
      return;
    }

    if (rating === 0) {
       toast.error("Please select a rating");
      return;
    }

    try {
      const feedbackData = {
        recipeId,
        userId: user._id,
        rating,
        comment: description,
      };

      if (editingId) {
        await editFeedback(editingId, feedbackData);
        toast.success("Review has been successfully updated!");
        setEditingId(null);
      } else {
        await createFeedback(feedbackData);
        toast.success("Your review has been submitted successfully!");

      }

      setRating(0);
      setHover(0);
      setDescription('');
    } catch (err) {
      console.error("Feedback submission failed:", err);
      toast.error(err.response?.data?.message || 
        (editingId ? "Failed to update review" : "Failed to submit review"));
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setRating(item.rating);
    setDescription(item.comment);
  };

  const totalReviews = feedback.length;
  const averageRating = feedback.reduce((sum, item) => sum + item.rating, 0) / totalReviews || 0;

  return (
    <div className="space-y-6">
      {/* Feedback Form */}
      <div className='w-full max-w-2xl bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>
          Reviews ({totalReviews}) - ⭐ {averageRating.toFixed(1)}
        </h2>

        {user ? (
          <>
            <div className='flex gap-3 items-center mb-6'>
              <img
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                src={user?.images?.[0]?.url || "https://github.com/shadcn.png"}
                alt="User profile"
              />
              <h3 className='text-lg font-semibold text-gray-700'>{user.name}</h3>
            </div>

            <div className='mb-6'>
              <h3 className='text-lg font-medium text-gray-700 mb-2'>My Rating</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <button
                      key={i}
                      className="mr-1 text-2xl focus:outline-none"
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(ratingValue)}
                    >
                      {ratingValue <= (hover || rating) ? (
                        <MdOutlineStar className="text-orange-500" />
                      ) : (
                        <MdOutlineStarBorder className="text-gray-400" />
                      )}
                    </button>
                  );
                })}
                <span className="ml-2 text-gray-600">
                  {rating > 0 ? `You rated ${rating} star${rating !== 1 ? 's' : ''}` : 'Not rated'}
                </span>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-medium text-gray-700 mb-2'>Description</h3>
              <textarea
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                placeholder='What did you think about this recipe?'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-4">
              {(editingId || rating > 0 || description) && (
                <button
                  onClick={() => {
                    setRating(0);
                    setHover(0);
                    setDescription('');
                    setEditingId(null);
                  }}
                  className="mr-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition duration-200"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : editingId ? 'Update Review' : 'Submit Review'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600">Please login to leave a review</p>
          </div>
        )}
      </div>

      {/* Feedback List */}
      {feedback.map((item) => (
        <Comment
          key={item._id}
          comment={item}
          currentUserId={user?._id}
          onEdit={() => handleEdit(item)}
        />
      ))}
    </div>
  );
};

export default Feedback;