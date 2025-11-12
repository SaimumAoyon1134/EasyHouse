import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Saimum Islam",
    role: "Web Developer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Skill Exchange helped me connect with designers who wanted to learn coding — I taught them web dev, and they taught me design. Brilliant concept!",
  },
  {
    id: 2,
    name: "Sadia Noor",
    role: "Graphic Designer",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
    review:
      "I love how easy it is to trade skills! I didn’t need to pay for a course — just exchanged my design knowledge for English lessons.",
  },
  {
    id: 3,
    name: "Rahim Uddin",
    role: "Digital Marketer",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    review:
      "The Skill Exchange platform makes learning social and rewarding. I’ve met great mentors and students from different fields.",
  },
  {
    id: 4,
    name: "Farzana Akter",
    role: "Content Writer",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
    review:
      "The idea of exchanging skills instead of money is amazing! I’ve already improved my technical writing by collaborating with developers here.",
  },
  {
    id: 5,
    name: "Tanjim Rahman",
    role: "Student",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    review:
      "This platform gave me real learning opportunities. It’s not just theory — it’s practice and collaboration with real people.",
  },
];

export default function ReviewSection() {
  return (
    <div className="py-6 px-0 ">
      <h2 className="text-3xl font-bold px-4 text-left mb-10">
        What Our Learners Say
      </h2>

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
        {reviews.map((r) => (
          <SwiperSlide key={r.id}>
            <div className="bg-white  shadow-gray-600 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 h-[250px]">
              <h3 className="text-lg font-semibold text-gray-800">{r.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{r.role}</p>
              <p className="text-gray-600 italic">“{r.review}”</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
