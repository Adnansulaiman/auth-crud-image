import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  // Get the functions from auth context
  const { loggedIn, logout } = useAuth();

  return (
    <div className="bg-white fixed flex justify-between items-center z-50 text-black w-[calc(100%-6rem)] left-12 mt-5 h-16 px-10 rounded-full shadow-2xl">
      <h1 className="text-3xl font-black text-[#4f57c7] ">Galleryy.</h1>

      {loggedIn ? (
        <Link onClick={() => logout()}>
          <button className="bg-[#9096e6] cursor-pointer text-white px-10 py-2 rounded-md text-lg font-semibold shadow-2xl ">
            Logout
          </button>
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <button className="bg-[#c5c9ff] cursor-pointer text-white px-10 py-2 rounded-md text-lg font-semibold shadow-2xl ">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-[#4f57c7] cursor-pointer text-white px-8 py-2 rounded-md text-lg font-semibold shadow-2xl ">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
