import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="w-full h-screen bg-[linear-gradient(90deg,_#efd5ff_0%,_#515ada_100%)] flex justify-center items-center">
      <div className="flex bg-white w-2/5 h-2/3 rounded-xl shadow-2xl flex-col px-8 py-8  ">
        <h1 className="text-4xl font-bold pb-10  text-[#4f57c7]">
          Welcome back!
        </h1>
        <form action="" className="w-full flex flex-col">
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
            className="w-full rounded bg-[#4f57c7] py-4 mt-10 text-white font-bold text-xl"
          >
            Login
          </button>
        </form>
        <p className="text-center w-full py-2">
          Don't have an account?{" "}
          <Link to='/register'>
          
          <span className="font-bold underline">Register</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login