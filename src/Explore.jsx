import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Explore = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center my-10">
      <motion.button
        onClick={() => navigate("/services")}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-[#6A11CB] to-[#2575FC] text-white font-semibold shadow-lg hover:shadow-xl focus:outline-none"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            "0px 0px 0px rgba(0, 0, 0, 0.2)",
            "0px 0px 20px rgba(101, 59, 255, 0.6)",
            "0px 0px 0px rgba(0, 0, 0, 0.2)",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        whileHover={{
          scale: 1.15,
          transition: { duration: 0.3 },
        }}
      >
       <ArrowDownwardIcon/> Explore Services
      </motion.button>
    </div>
  );
};

export default Explore;