import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { Range } from "react-range";

const Services = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]); 
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedPriceRange, setDebouncedPriceRange] = useState([0, 100000]);
  const navigate = useNavigate();


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setDebouncedPriceRange(priceRange);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm, priceRange]);


  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedSearch) params.append("search", debouncedSearch);
        if (debouncedPriceRange[0] !== null) params.append("minPrice", debouncedPriceRange[0]);
        if (debouncedPriceRange[1] !== null) params.append("maxPrice", debouncedPriceRange[1]);
        console.log(params)
        const url =
          params.toString().length > 0
            ? `http://localhost:3000/services?${params.toString()}`
            : "http://localhost:3000/services";

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        console.log(data)
        setServices(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [debouncedSearch, debouncedPriceRange]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Services</h2>

   
      <div className="flex flex-col sm:flex-row gap-6 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Search by name or category..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="w-full max-w-md px-2 relative">
          <p className="text-sm font-medium mb-1">
            Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
          </p>
          <Range
            step={1000}
            min={0}
            max={100000}
            values={priceRange}
            onChange={(values) => setPriceRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full bg-gray-300 rounded relative"
              >
                <div
                  className="absolute h-2 bg-green-500 rounded"
                  style={{
                    left: `${(priceRange[0] / 100000) * 100}%`,
                    width: `${((priceRange[1] - priceRange[0]) / 100000) * 100}%`,
                  }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props, index }) => (
              <div {...props} className="relative flex flex-col items-center">
              
                <div className="absolute top-6 right-3 w-max px-2 py-1 bg-green-500 text-white text-xs rounded shadow-lg whitespace-nowrap">
                  {priceRange[index].toLocaleString()}
                </div>
                <div className="h-6 w-6 bg-green-500 rounded-full shadow-lg" />
              </div>
            )}
          />
        </div>
      </div>

      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="p-4 rounded shadow-md hover:shadow-lg hover:scale-[1.04] transition"
            >
              <img
                src={service.image }
                alt={service.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <div className="flex justify-between mt-2 mb-2">
                <div className="border-green-500 border py-1 px-2 rounded-2xl">
                  <p>{service.category}</p>
                </div>
                <div>
                  <p className="font-bold">${service.price.toLocaleString()}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/service/${service._id}`)}
                className="btn bg-gradient-to-r from-[#6A11CB] to-[#2575FC] text-white  w-full"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;