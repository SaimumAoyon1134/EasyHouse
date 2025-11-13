import React from "react";
import { FaStar, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";

const StaticSections = () => {
  return (
    <div className=" ">
 
      <section className="py-16 px-6 md:px-16 bg-gradient-to-r from-[#6A11CB] to-[#2575FC] text-white text-center">
        <h2 className="text-4xl font-extrabold mb-8 animate__animated animate__fadeInDown">
          Why Choose <span className="text-yellow-300">EasyHome</span>?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:bg-white/20 transition-all duration-300">
            <FaCheckCircle className="text-yellow-300 text-4xl mb-3" />
            <h3 className="text-2xl font-semibold mb-2">Verified Professionals</h3>
            <p className="text-gray-100 text-sm">
              Every service provider on EasyHome is verified for quality, safety, and reliability.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:bg-white/20 transition-all duration-300">
            <FaCheckCircle className="text-yellow-300 text-4xl mb-3" />
            <h3 className="text-2xl font-semibold mb-2">Fast & Reliable</h3>
            <p className="text-gray-100 text-sm">
              Quick booking, on-time arrival, and professional work — every single time.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:bg-white/20 transition-all duration-300">
            <FaCheckCircle className="text-yellow-300 text-4xl mb-3" />
            <h3 className="text-2xl font-semibold mb-2">Affordable Pricing</h3>
            <p className="text-gray-100 text-sm">
              Transparent and budget-friendly pricing — no hidden fees or surprises.
            </p>
          </div>
        </div>
      </section>


      <section className="py-20 px-6 md:px-16  text-center">
        <h2 className="text-4xl font-extrabold mb-10 ">
          What Our <span className="text-[#6A11CB]">Customers</span> Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Aminul Islam",
              text: "The cleaning service was excellent! Fast response and very professional behavior.",
            },
            {
              name: "Shanta Rahman",
              text: "Booked an electrician and got the issue fixed within an hour. Highly recommended!",
            },
            {
              name: "Rafi Khan",
              text: "EasyHome is now my go-to for all home services. Smooth booking and friendly staff.",
            },
          ].map((review, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl  shadow-md hover:shadow-lg transition-all duration-300 relative"
            >
              <FaQuoteLeft className="text-[#6A11CB] text-3xl mb-3" />
              <p className="italic mb-4 ">“{review.text}”</p>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-400" />
                ))}
              </div>
              <h4 className="font-semibold text-gray-900">{review.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StaticSections;