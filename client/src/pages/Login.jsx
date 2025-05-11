import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../hooks/useForm';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Custome hook for form handling
  const initialData = { email: "", password: "" };
  const { values: formData, handleChange, resetForm } = useForm(initialData);

//   form submit handling
const handleSubmit = async(e) =>{
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try{
        const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage(response.data.message);
      resetForm();
      login(response.data.token);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }catch(error){
        console.log(error);
         setErrorMessage(error.response?.data?.message);
    }

}

// Confirm not get null value
const isButtonDisabled = !formData?.email || !formData?.password;

  return (
    <div className="w-full h-screen bg-[linear-gradient(90deg,_#efd5ff_0%,_#515ada_100%)] flex justify-center pt-10 items-center">
      <div className="flex bg-white w-2/5 h-2/3 rounded-xl shadow-2xl flex-col px-8 py-8  ">
        <h1 className="text-4xl font-bold pb-10  text-[#4f57c7]">
          Welcome back!
        </h1>
        <form action="" onSubmit={handleSubmit} className="w-full flex flex-col">
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="name" className="text-lg font-semibold ">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              className="bg-transparent border-1 border-slate-400 rounded py-3 px-3"
            />
          </div>
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="name" className="text-lg font-semibold ">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleChange}
              className="bg-transparent border-1 border-slate-400 rounded py-3 px-3"
            />
          </div>
          {errorMessage && (
            <p className="text-sm md:text-base  text-red-500">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-sm md:text-base  text-green-500">
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full rounded py-4 mt-10 text-white font-bold text-xl ${
                isButtonDisabled
                ? " cursor-not-allowed bg-[#898eda] "
                : "bg-[#4f57c7]  hover:bg-opacity-90 "
            }`}
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