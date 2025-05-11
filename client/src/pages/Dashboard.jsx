import React from "react";
import { IoSearch } from "react-icons/io5";
import CardItem from "../components/CardItem";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  

  // Get all data from server
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/get-all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-screen flex flex-col bg-white p-3  ">
      <div className="flex flex-col bg-[linear-gradient(90deg,_#efd5ff_0%,_#515ada_100%)] px-10 h-scr text-white rounded-md w-full py-4 ">
        <div className="flex flex-col border-b-3  border-white">
          <h1 className="text-6xl font-bold pt-28   ">Welcome back :) </h1>
          <div className="flex justify-between items-center">
            <Link
              to="/add-new"
              className=" flex items-center gap-2  px-10 w-1/5 py-3 rounded-full cursor-pointer bg-white text-[#515ada]"
            >
              <FaPlus className="text-xl" />
              <p className="text-2xl font-semibold">Create new</p>
            </Link>

            <form
              action=""
              onSubmit={(e) => e.preventDefault()}
              className="flex justify-end w-full p-10 relative"
            >
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex bg-white w-1/2 h-16 rounded-full outline-none px-5 text-black text-lg"
              />
              <button
                type="submit"
                className="bg-[#515ada] absolute right-11 top-11 text-lg cursor-pointer font-semibold px-8 py-4 h-14 rounded-full "
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="flex gap-4 w-full  flex-wrap">
          {/* <CardItem />
            <CardItem />
            <CardItem />
            <CardItem /> */}
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item) => <CardItem key={item._id} data={item} />)
          ) : (
            <p className="text-center text-2xl">No matching items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
