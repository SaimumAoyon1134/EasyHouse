import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`http://localhost:3000/bookings?userEmail=${user.email}`);
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
      const res = await fetch(`http://localhost:3000/bookings/${id}`, {
        method: "DELETE",
      });

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

  if (loading) return <div>Loading your bookings...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-4 rounded shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {booking.serviceName}
              </h3>
              <p>
                <span className="font-semibold">Provider:</span>{" "}
                {booking.userName || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ${booking.price}
              </p>
              <p>
                <span className="font-semibold">Booked At:</span>{" "}
                {new Date(booking.bookedAt).toLocaleString()}
              </p>
              <div className="w-full flex justify-center">
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="btn btn-primary mt-3 w-full"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;