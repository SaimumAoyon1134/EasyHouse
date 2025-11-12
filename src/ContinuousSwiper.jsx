import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import skills from "../skills";
import { useNavigate } from "react-router-dom";

const ContinuousSwiper = () => {
  const navigate = useNavigate()
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
        {skills.map((item) => (
          <SwiperSlide key={item.skillId}>
            <div className="flex flex-col items-center justify-center rounded-xl p-4 shadow-lg bg-gray-100 h-[300px] "
              onClick={() => {
                console.log(item.skillId)
              navigate(`allcourse/${item.skillId}`)
            }}>
              <img
                src={item.image}
                alt={item.skillName}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <p className=" text-center text-2xl text-black font-bold">
                {item.skillName}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContinuousSwiper;
