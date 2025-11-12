import React from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import image from "./image.png"
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  return (
    <div className="bg-[#001931] text-white p-[3rem] mt-2 ">
      <div className="flex justify-between mb-[1rem] flex-col md:flex-row">
        <div className="md:flex flex-col hidden  align-center items-center">
          <img src={image} className="w-[60px] rounded-1xl" alt="" />
          <p className="px-[1rem]">Easy Home</p>
          <p className="px-[1rem] text-gray-400">Contacts:0123456789</p>
        </div>
        <div className="md:w-[30%]">
         Easy Home Services is a modern web application designed to simplify finding and booking professional home services. Whether you need a plumber, electrician, cleaner, or handyman, Easy Home Services connects you with verified professionals in just a few clicks.
        </div>
        <div>
          <p>Social Links</p>
          <div>
            <FacebookIcon className="mx-[0.5rem]" />
            <LinkedInIcon className="mx-[0.5rem]" />
            <XIcon className="mx-[0.5rem]" />
          </div>
        </div>
      </div>
      <p className="text-gray-400 text-sm text-center">
        Copyright © 2025 - All right reserved
      </p>
    </div>
  );
};

export default Footer;
