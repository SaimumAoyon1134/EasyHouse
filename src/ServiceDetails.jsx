import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
import BookingReview from "./BookingReview";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(
          `https://skill-development-backend.vercel.app/services/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch service details");
        const data = await res.json();
        setService(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load service details");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      toast.error("You must be logged in to book a service");
      return;
    }

    if (user.email === service.email) {
      Swal.fire(
        "Warning",
        "Failed to book service. You cannot book your own service!",
        "error"
      );
      return;
    }

    const result = await Swal.fire({
      title: "Confirm Booking",
      html: `
        <p>Do you want to book <strong>${service.name}</strong> for <strong>${
        service.price
      } BDT </strong> on <strong>${
        new Date().toISOString().split("T")[0]
      }</strong>?</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
    });

    if (!result.isConfirmed) {
      Swal.fire("Booking cancelled", "", "info");
      return;
    }

    try {
      const bookingData = {
        serviceId: service._id,
        serviceName: service.name,
        userEmail: user.email,
        userName: user.displayName,
        price: service.price,
        bookedAt: new Date().toISOString(),
      };

      const res = await fetch(
        "https://skill-development-backend.vercel.app/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (res.ok) {
        Swal.fire(
          "Booked!",
          "Your service has been successfully booked.",
          "success"
        );
      } else {
        Swal.fire("Error", "Failed to book service. Try again later.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong: " + err.message, "error");
    }
  };

  if (loading)
    return (
      <div className="text-center py-12 text-lg font-medium">Loading...</div>
    );

  if (!service)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-600">
          Service not found !!
        </h1>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex border flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden">
        <div className="md:w-1/2">
          <img
            src={
              service.image ||
              "https://cdn-icons-png.flaticon.com/512/5474/5474438.png"
            }
            alt={service.name}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
          <p className="text-lg mb-2">
            <span className="font-semibold">Category:</span> {service.category}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Provider:</span>{" "}
            <span className="text-green-600 font-bold">
              {service.providerName}
            </span>
          </p>
          <p className="text-sm mb-4">📧 {service.email}</p>
          <p className="text-2xl font-semibold text-green-600 mb-4">
            {service.price} BDT
          </p>
          <p className="leading-relaxed mb-6">{service.description}</p>

          <div className="flex justify-end">
            <button className="btn btn-primary" onClick={handleBook}>
              Book Now
            </button>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
        {service.reviews && service.reviews.length > 0 ? (
          <div className="space-y-3">
            {service.reviews.map((rev, idx) => (
              <div key={idx} className="border p-2 rounded">
                <div className="flex items-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= rev.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm">{rev.userEmail}</span>
                </div>
                <p>{rev.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
