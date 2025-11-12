import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";

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

  if (loading) return <div>Loading your bookings...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="p-4 rounded shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{booking.serviceName}</h3>
              <p>
                <span className="font-semibold">Provider:</span> {booking.providerName || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ${booking.price}
              </p>
              <p>
                <span className="font-semibold">Booked At:</span>{" "}
                {new Date(booking.bookedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;