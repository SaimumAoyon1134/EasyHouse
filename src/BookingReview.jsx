import React, { useState } from "react";
import { toast } from "react-hot-toast";

const BookingReview = ({ serviceId, userEmail, setActiveReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    if (rating === 0) return toast.error("Please select a rating");
    try {
      const res = await fetch(
        `https://skill-development-backend.vercel.app/services/${serviceId}/review`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail, rating, comment }),
        }
      );
      if (!res.ok) throw new Error("Failed to submit review");
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      setActiveReview(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="mt-4 p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">Rate this service</h3>
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer text-2xl ${
              star <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-2 border rounded mb-2 "
      />
      <div className="w-full flex justify-center">
        <button
          onClick={submitReview}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default BookingReview;
