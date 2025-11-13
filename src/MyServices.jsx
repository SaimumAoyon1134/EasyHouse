import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Swal from "sweetalert2";

const ProviderServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const fetchServices = async () => {
    try {
      const response = await fetch(
        `https://skill-development-backend.vercel.app/myservices?email=${user.email}`
      );
      const data = await response.json();
      setServices(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch services");
    }
  };

  useEffect(() => {
    if (user?.email) fetchServices();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price,
      image: service.image,
      description: service.description,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://skill-development-backend.vercel.app/services/${selectedService._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, price: Number(formData.price) }),
        }
      );
      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: "Updated successfully",
        });
        fetchServices();
        closeModal();
      } else {
        toast.error("Failed to update service");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! " + err.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!result.isConfirmed) {
      Swal.fire("Cancelled", "Your service was not deleted.", "info");
      return;
    }
    try {
      const response = await fetch(
        `https://skill-development-backend.vercel.app/services/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Service deleted successfully!");
        fetchServices();
      } else {
        toast.error("Failed to delete service");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! " + err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Services</h2>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto border rounded-2xl">
          <thead className="">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="text-center">
                <td className="border px-4 py-2">{service.name}</td>
                <td className="border px-4 py-2">{service.category}</td>
                <td className="border px-4 py-2">{service.price}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => openEditModal(service)}
                    className="btn btn-sm bg-gradient-to-r from-[#6A11CB] to-[#2575FC] text-white hover:scale-[1.04] "
                  >
                    <UpgradeIcon />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="btn btn-sm bg-gradient-to-r from-[#6A11CB] to-[#2575FC]  text-white hover:scale-[1.04]"
                  >
                    <DeleteIcon />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {services.map((service) => (
          <div key={service._id} className="p-4 border rounded shadow-sm ">
            <h3 className="font-bold text-lg">{service.name}</h3>
            <p>
              <span className="font-medium">Category:</span> {service.category}
            </p>
            <p>
              <span className="font-medium">Price:</span> {service.price}
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => openEditModal(service)}
                className="btn btn-sm btn-primary flex-1 "
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="btn btn-sm btn-error flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-gradient-to-r from-[#6A11CB] to-[#2575FC] rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6"
            >
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="input input-bordered w-full"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="textarea textarea-bordered w-full"
                  required
                />
                <div className="flex  sm:flex-row justify-between mt-4 gap-2">
                  <button
                    type="submit"
                    className="btn btn-neutral border-neutral flex-1"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-neutral flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProviderServices;
