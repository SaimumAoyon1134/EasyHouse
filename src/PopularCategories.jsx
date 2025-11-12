import React from "react";
import "animate.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Music",
    image:
      "https://images.macrumors.com/t/hi1_a2IdFGRGMsJ0x31SdD_IcRk=/1600x/article-new/2018/05/apple-music-note.jpg",
    skillsCount: 12,
  },
  {
    id: 2,
    name: "Cooking",
    image:
      "https://img.freepik.com/free-photo/top-view-cropped-hands-senior-cook-unrecognizable-cutting-carrot-cooking-vegetable-stew_1098-20510.jpg?semt=ais_hybrid&w=740&q=80",
    skillsCount: 8,
  },
  {
    id: 3,
    name: "Technology",
    image: "https://s44783.pcdn.co/wp-content/uploads/2023/11/tech.png",
    skillsCount: 15,
  },
  {
    id: 4,
    name: "Fitness",
    image:
      "https://youfit.com/wp-content/uploads/2024/06/YouFit-06-20-22-2527-Edit.jpg",
    skillsCount: 10,
  },
];

const PopularCategories = () => {
  const navigate = useNavigate();

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Popular Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-base-100 shadow-lg rounded-xl overflow-hidden cursor-pointer hover:animate__animated hover:animate__pulse transition transform"
            onClick={() => navigate(`/allcourse?category=${cat.name}`)}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{cat.name}</h2>
              <p className="text-gray-500">{cat.skillsCount} Skills</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
