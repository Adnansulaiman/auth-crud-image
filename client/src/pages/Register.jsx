import React from "react";

const Register = () => {
  return (
    <div className="w-full h-screen bg-[linear-gradient(90deg,_#efd5ff_0%,_#515ada_100%)] flex justify-center items-center">
      <div className="flex bg-white w-2/5 h-2/3 rounded-xl shadow-2xl flex-col px-8 py-6  ">
        <h1 className="text-4xl font-bold pb-3 text-[#4f57c7]">
          Create an account
        </h1>
        <form action="" className="w-full flex flex-col">
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="name" className="text-lg font-semibold ">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="bg-transparent border-1 border-slate-400 rounded py-3"
            />
          </div>
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="name" className="text-lg font-semibold ">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="bg-transparent border-1 border-slate-400 rounded py-3"
            />
          </div>
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="name" className="text-lg font-semibold ">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="bg-transparent border-1 border-slate-400 rounded py-3"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-[#4f57c7] py-4 mt-6 text-white font-bold text-xl"
          >
            Create account
          </button>
        </form>
        <p className="text-center w-full py-2">
          Already have an account?{" "}
          <span className="font-bold underline">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
