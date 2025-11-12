import React from "react";
import skills from "../skills";
import "animate.css";
import { useNavigate } from "react-router-dom";


const AllCourse = () => {
  const navigate = useNavigate(); 

  return (
    <div className="animate__animated animate__fadeInRight">
     
      <section>
        <h1 className="text-3xl font-bold mb-6 p-4">All Skills</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.skillId}
              className="bg-base-100 shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:animate__animated hover:animate__pulse"
            >
              <img
                src={skill.image}
                alt={skill.skillName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{skill.skillName}</h2>
                <p className="text-yellow-500 font-medium">
                  ⭐ {skill.rating.toFixed(1)}
                </p>
                <p className="font-medium">Price: ${skill.price}</p>

                <button
                  onClick={() => navigate(`/allcourse/${skill.skillId}`)} // ✅ fixed
                  className="btn btn-neutral mt-2 w-full hover:bg-green-500 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllCourse;
