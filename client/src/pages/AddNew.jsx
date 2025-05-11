import React from "react";
import Image from "../assets/demo.jpg";
import { MdClose } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { useState } from "react";
import useForm from "../hooks/useForm";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";

const AddNew = () => {
  // Update functionalities
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", addData.title);
      formData.append("description", addData.description);
      if (file) formData.append("image", file);

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/update/${
          editingItem._id
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsEditModalOpen(false);
      setEditingItem(null);
      resetForm();
      setFile(null);
      setPreview(null);
      fetchData(); // refresh data
    } catch (error) {
      console.error("Edit error:", error);
      setErrorMessage(error.response?.data?.message || "Failed to update");
    }
  };

  // Delete functionalities
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchData(); //fetch data after delete
    } catch (error) {
      console.error("Delete error:", error);
      setErrorMessage("Failed to delete item");
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  // Get functionalities
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

  // Add functionalites
  const fileInputRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Custome hook for form handling
  const initialData = { title: "", description: "" };
  const { values: addData, handleChange, resetForm } = useForm(initialData);

  //   handle file upload
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  //   handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", addData?.title);
      formData.append("description", addData?.description);
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        resetForm();
        setFile(null);
        setPreview(null);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setSuccessMessage(response.data.message);
        fetchData(); //fetch data after adding new one
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message);
    }
  };

  // Confirm not get null value
  const isButtonDisabled = !addData?.title || !addData?.description || !file;

  return (
    <div className="bg-[linear-gradient(90deg,_#efd5ff_0%,_#515ada_100%)] w-full h-screen px-12 py-28">
      <div className="flex bg-white w-full  rounded-2xl py-6 px-6  ">
        <div className="flex flex-col w-1/2 px-4  border-r-2 border-[#515ada]">
          <h1 className="text-4xl font-bold text-[#515ada] pb-3 ">
            Add new one
          </h1>
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-full flex flex-col"
          >
            <div className="flex flex-col gap-2 py-1">
              <label htmlFor="text" className="text-lg font-semibold ">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={addData?.email}
                onChange={handleChange}
                className="bg-transparent border-1 border-slate-400 rounded py-3 px-3"
              />
            </div>
            <div className="flex flex-col gap-2 py-1">
              <label htmlFor="description" className="text-lg font-semibold ">
                Description
              </label>
              <textarea
                name="description"
                id=""
                value={addData?.description}
                onChange={handleChange}
                className="bg-transparent border-1 border-slate-400 rounded py-3 px-3"
              ></textarea>
            </div>
            <label htmlFor="image" className="text-lg font-semibold ">
              Image
            </label>
            <input
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="bg-transparent border-1 border-slate-400 rounded py-3 px-3"
            />
            {/* <div className="w-32 h-32 my-4  bg-black"></div> */}
            {preview && (
              <div className="my-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover"
                />
              </div>
            )}
            {errorMessage && (
              <p className="text-sm md:text-base  text-red-500">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="text-sm md:text-base  text-green-500">
                {successMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full rounded py-4 mt-4  text-white font-bold text-xl ${
                isButtonDisabled
                  ? " cursor-not-allowed bg-[#898eda] "
                  : "bg-[#4f57c7]  hover:bg-opacity-90 cursor-pointer"
              }`}
            >
              Add
            </button>
          </form>
        </div>
        <div className="flex flex-col w-1/2 px-6 h-[570px] ">
          <h1 className="text-2xl font-bold text-[#515ada]">Your items</h1>
          <div className="flex flex-col py-8 overflow-y-auto h-full ">
            {data ? (
              data?.map((item) => (
                <div
                  key={item._id}
                  className="flex border-b justify-between border-slate-300 py-2"
                >
                  <div className="flex">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${
                        item.imageUrl
                      }`}
                      alt=""
                      className="w-28 h-28 rounded-md"
                    />
                    <div className="flex flex-col px-10">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-10 items-center">
                    <MdClose
                      className="text-2xl cursor-pointer text-red-500 "
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this item?"
                          )
                        ) {
                          handleDelete(item._id);
                        }
                      }}
                    />
                    <FiEdit3
                      className="text-xl cursor-pointer text-blue-500"
                      onClick={() => {
                        setEditingItem(item);
                        resetForm({
                          title: item.title,
                          description: item.description,
                        });
                        setPreview(`${import.meta.env.VITE_BACKEND_URL}${item.imageUrl}`);
                        setIsEditModalOpen(true);
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>Empty Items</p>
            )}
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] relative shadow-2xl">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-500"
            >
              <MdClose />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#515ada]">
              Edit Item
            </h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                value={addData.title}
                onChange={handleChange}
                placeholder="Title"
                className="border px-3 py-2 rounded"
              />
              <textarea
                name="description"
                value={addData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border px-3 py-2 rounded"
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="border px-3 py-2 rounded"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              )}
              <button
                type="submit"
                className="bg-[#4f57c7] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNew;
