import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "./AuthContext"; // for logged-in user
import { toast } from "react-hot-toast";

const Services = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:3000/services");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setModalOpen(false);
  };

  const handleBook = async () => {
    if (!user) {
      toast.error("You must be logged in to book a service");
      return;
    }
    try {
      const bookingData = {
        serviceId: selectedService._id,
        serviceName: selectedService.name,
        userEmail: user.email,
        userName: user.displayName || "Anonymous",
        price: selectedService.price,
        bookedAt: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        toast.success("Service booked successfully!");
        closeModal();
      } else {
        toast.error("Failed to book service");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! " + err.message);
    }
  };

  if (loading) return <div>Loading services...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Services</h2>

      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="p-4 rounded shadow-md  hover:shadow-lg hover:scale-[1.04] transition"
            >
              <img
                src={service.image || "https://via.placeholder.com/150"}
                alt={service.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <div className="flex justify-between mt-2 mb-2">
                <div className="bg-green-500 py-1 px-2 rounded-2xl">
                  <p className="text-white">{service.category}</p>
                </div>
                <div>
                  <p className="font-bold">${service.price}</p>
                </div>
              </div>
              <button
                onClick={() => openModal(service)}
                className="btn btn-primary w-full "
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && selectedService && (
          <motion.div
            className="fixed inset-0  flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className=" bg-[#001931] rounded-lg text-white shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3"
              >
                <CloseIcon />
              </button>

              <h3 className="text-2xl font-bold mb-4 ">{selectedService.name}</h3>
              <img
                src={selectedService.image || "https://via.placeholder.com/300"}
                alt={selectedService.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p className="mb-2">
                <span className="font-semibold">Category:</span>{" "}
                {selectedService.category}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Price:</span> ${selectedService.price}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Description:</span>{" "}
                {selectedService.description}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Provider:</span>{" "}
                {selectedService.providerName}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Email:</span> {selectedService.email}
              </p>
              <button
                onClick={handleBook}
                className="btn btn-success w-full"
              >
                Book Service
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;