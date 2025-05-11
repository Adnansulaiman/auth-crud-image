import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useState } from "react";
import axios from 'axios';


const Register = () => {
    const navigate = useNavigate();

    // create success & error message state
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
  // Custome hook for form handling
  const initialValue = {
    name: "",
    email: "",
    password: "",
  };
  const { values: formData, handleChange, resetForm } = useForm(initialValue);

  // form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setSuccessMessage(response.data.message);
      resetForm();
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data.message);
    }
  };

  // Confirm not get null value
  const isButtonDisabled =
      !formData?.name ||
      !formData?.email ||
      !formData?.password;

  return (
    <div className="w-full h-screen bg-[linear-gradient(90deg,_#efd5ff_0%,_#515ada_100%)] pt-10 flex justify-center items-center">
      <div className="flex bg-white w-2/5  rounded-xl shadow-2xl flex-col px-8 py-6  ">
        <h1 className="text-4xl  font-bold pb-3 text-[#4f57c7]">
          Create an account
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col"
        >
          <div className="flex flex-col gap-2 py-1">
            <label htmlFor="name" className="text-lg font-semibold ">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              className="bg-transparent border-1 border-slate-400 rounded py-3 px-3"
            />
          </div>
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
            <p className="text-sm md:text-base  text-red-500 ">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-sm md:text-base  text-green-500">
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full rounded bg-[#4f57c7] py-4 mt-6 text-white font-bold text-xl ${isButtonDisabled
                ? " cursor-not-allowed bg-[#898eda] "
                : " hover:bg-opacity-90 bg-[#4f57c7] cursor-pointer "
            } } `}
          >
            Create account
          </button>
        </form>
        <p className="text-center w-full py-2">
          Already have an account?{" "}
          <Link to="/login">
            <span className="font-bold underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
