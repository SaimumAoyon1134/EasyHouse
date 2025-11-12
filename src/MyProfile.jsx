import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import "animate.css";
import { typewriterEffect } from "./gsapTypewriter"; 

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    // Apply typing animations sequentially
    typewriterEffect("#profileTitle");
    typewriterEffect("#tableTitle", 2.5);
    typewriterEffect("#userLabel", 4.5);
    typewriterEffect("#emailLabel", 6);
  }, []);

  if (!user) navigate("/");
  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center  w-[30%] mx-auto p-3 mt-3 animate__animated animate__fadeInDown">
      {/* Animated heading */}
      <h1
        id="profileTitle"
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          whiteSpace: "pre",
        }}
      >
        My Profile
      </h1>

      <div className="w-[100px] h-[100px]">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-full h-full object-cover rounded-full shadow-2xl shadow-black"
          />
        ) : (
          <FaRegUserCircle className="text-8xl" />
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="overflow-x-auto mt-6">
          <table className="table w-full max-w-md mx-auto shadow-md rounded-xl">
            <thead>
              <tr>
                <th
                  colSpan={2}
                  id="tableTitle"
                  className="text-center text-lg font-bold"
                >
                  My Information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                <td id="userLabel" className="font-medium">
                  User Name
                </td>
                <td>{user?.displayName || "N/A"}</td>
              </tr>
              <tr className="hover">
                <td id="emailLabel" className="font-medium">
                  Email
                </td>
                <td>{user?.email || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          className="btn btn-neutral mt-4"
          onClick={() => navigate("/update")}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
