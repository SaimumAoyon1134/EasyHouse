import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "./AuthContext";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const [serviceData, setServiceData] = useState({
    name: "",
    category: "",
    price: "",
    email: "",
    image: "",
    providerName: "",
    description: "",
  });

  useEffect(() => {
    if (user) {
      setServiceData((prev) => ({
        ...prev,
        email: user.email || "",
        providerName: user.displayName || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  for (let key in serviceData) {
    if (!serviceData[key]) {
      toast.error(`${key} is required`);
      return;
    }
  }

  const mainData = {
    ...serviceData,
    image: serviceData.image || null,
    price: Number(serviceData.price), 
  };

  try {
    const response = await fetch(
      "https://skill-development-backend.vercel.app/services",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mainData),
      }
    );
    if (response.ok) {
      toast.success("Service added successfully!");
      setServiceData((prev) => ({
        ...prev,
        name: "",
        category: "",
        price: "",
        description: "",
        image: "",
      }));
    } else {
      toast.error("Failed to add service.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong! " + error.message);
  }
};
  return (
    <div className="max-w-6xl mx-auto p-6 shadow-md rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Service</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div>
          <label className="block font-medium mb-1">Service Name</label>
          <input
            type="text"
            name="name"
            value={serviceData.name}
            onChange={handleChange}
            placeholder="Enter service name"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={serviceData.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={serviceData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={serviceData.email}
            readOnly
            className="input input-bordered w-full  cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Provider Name</label>
          <input
            type="text"
            name="providerName"
            value={serviceData.providerName}
            readOnly
            className="input input-bordered w-full  cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={serviceData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="input input-bordered w-full"
          />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            className="textarea textarea-bordered w-full min-h-[120px]"
          />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center">
          <button
            type="submit"
            className="btn  bg-gradient-to-r from-[#6A11CB] to-[#2575FC]  text-white mt-4 flex items-center justify-center gap-2 px-8"
          >
            <AddIcon /> Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
