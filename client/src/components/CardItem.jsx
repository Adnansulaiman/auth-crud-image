import React from "react";
import Image from "../assets/demo.jpg";

const CardItem = ({ data }) => {
  return (
    <div className="flex w-[calc(50%-0.5rem)] bg-white h-60 rounded-2xl mt-6">
      <div className="flex">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${data.imageUrl}`}
          alt={`${data.title} image`}
          className="w-60 h-60 p-2 rounded-2xl "
        />
        <div className="flex flex-col text-black py-4 px-2 gap-4">
          <h1 className="text-2xl font-bold text-slate-800">{data?.title}</h1>
          <p className="text-lg text-slate-600">
            {data?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
