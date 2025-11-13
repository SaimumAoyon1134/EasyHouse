import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const ContinuousSwiper = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "https://skill-development-backend.vercel.app/services"
        );
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

  if (loading) return <Loading/>;

  return (
    <div className="my-10">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000}
        freeMode={true}
        allowTouchMove={false}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {services.map((item) => (
          <SwiperSlide key={item._id}>
            <div
              className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg h-[300px] cursor-pointer"
              onClick={() => navigate(`/service/${item._id}`)}
            >
              <img
                src={
                  item.image ||
                  "https://cdn-icons-png.flaticon.com/512/5474/5474438.png"
                }
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <p className="text-center text-2xl font-bold">{item.name}</p>
              <p className=" text-sm mb-4 text-center h-12 flex items-center justify-center">
                {item.description
                  ? item.description.length > 100
                    ? `${item.description.slice(0, 100)}...`
                    : item.description
                  : "No description"}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContinuousSwiper;
