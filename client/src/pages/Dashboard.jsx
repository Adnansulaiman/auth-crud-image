import React from "react";
import { IoSearch } from "react-icons/io5";
import CardItem from "../components/CardItem";

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-white p-3  ">
      <div className="flex flex-col bg-[linear-gradient(90deg,_#efd5ff_0%,_#515ada_100%)] px-10 h-scr text-white rounded-md w-full py-4 ">
        <div className="flex flex-col border-b-3  border-white">
          <h1 className="text-6xl font-bold pt-28   ">Welcome Adnan </h1>
          <form action="" className="flex justify-end w-full p-10 relative">
            <input
              type="text"
              placeholder="Search"
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
        <div className="flex gap-4 w-full  flex-wrap">
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
