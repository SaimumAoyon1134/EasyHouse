import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopRatedServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "https://skill-development-backend.vercel.app/services"
        );
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Expected an array of services");
          return;
        }

        // Calculate avgRating for each service
        const servicesWithRating = data.map((service) => {
          const avgRating =
            service.reviews && service.reviews.length
              ? service.reviews.reduce((sum, r) => sum + r.rating, 0) /
                service.reviews.length
              : 0;
          return { ...service, avgRating };
        });

        // Sort by avgRating descending and take top 6
        const topServices = servicesWithRating
          .sort((a, b) => b.avgRating - a.avgRating)
          .slice(0, 6);

        setServices(topServices);
        console.log("Top rated services:", topServices);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Top Rated Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service._id}
              onClick={() => navigate(`/service/${service._id}`)}
              className="cursor-pointer p-4 border rounded-2xl rounded hover:shadow-lg transition"
            >
              <img
                src={service.image || "https://via.placeholder.com/150"}
                alt={service.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold">{service.name}</h3>
              <p>
                Average Rating: {service.avgRating.toFixed(1)}{" "}
                <span className="text-orange-400">★</span>
              </p>
            </div>
          ))
        ) : (
          <p>No top-rated services found.</p>
        )}
      </div>
    </div>
  );
};

export default TopRatedServices;
