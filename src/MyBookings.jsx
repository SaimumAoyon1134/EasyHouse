import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import BookingReview from "./BookingReview";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CancelIcon from "@mui/icons-material/Cancel";
import Loading from "./Loading";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReview, setActiveReview] = useState(null);

  const fetchBookings = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(
        `https://skill-development-backend.vercel.app/bookings?userEmail=${user.email}`
      );
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://skill-development-backend.vercel.app/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      } else {
        Swal.fire("Error", "Failed to cancel booking. Try again.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong: " + err.message, "error");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full  border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Service</th>
                <th className="py-3 px-4 text-left font-semibold">Provider</th>
                <th className="py-3 px-4 text-left font-semibold">Price</th>
                <th className="py-3 px-4 text-left font-semibold">Booked At</th>
                <th className="py-3 px-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t hover:scale-[1.03] transition"
                >
                  <td className="py-3 px-4">{booking.serviceName}</td>
                  <td className="py-3 px-4">{booking.userName}</td>
                  <td className="py-3 px-4">${booking.price}</td>
                  <td className="py-3 px-4">
                    {new Date(booking.bookedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex flex-wrap gap-2 justify-center">
                    {user && (
                      <button
                        onClick={() => setActiveReview(booking)}
                        className="flex items-center gap-1 px-3 py-1 rounded border border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition text-sm"
                      >
                        <RateReviewIcon fontSize="small" /> Review
                      </button>
                    )}
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="flex items-center gap-1 px-3 py-1 rounded border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition text-sm"
                    >
                      <CancelIcon fontSize="small" /> Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {activeReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
          <div className="rounded-lg shadow-lg p-6 w-11/12 max-w-md  relative">
            <h3 className="text-xl font-bold mb-4">
              Review: {activeReview.serviceName}
            </h3>

            <BookingReview
              serviceId={activeReview.serviceId}
              userEmail={user.email}
              setActiveReview={setActiveReview}
              onClose={() => setActiveReview(null)}
            />

            <button
              onClick={() => setActiveReview(null)}
              className="absolute top-2 right-2 text-green-600 font-extrabold hover:text-red-600 font-bold text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
