import React from "react";
import { motion } from "framer-motion";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Invalid = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">

      <motion.div
        animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-red-600"
      >
        <ErrorOutlineIcon style={{ fontSize: 100 }} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center text-3xl md:text-4xl text-red-500 font-bold mt-6"
      >
        Oops! Invalid URL
      </motion.p>

    
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center text-gray-600 mt-2"
      >
        The page you are looking for does not exist.
      </motion.p>


      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="mt-6 flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded shadow hover:bg-green-600 transition"
      >
        <ArrowBackIcon /> Back to Home
      </motion.button>
    </div>
  );
};

export default Invalid;