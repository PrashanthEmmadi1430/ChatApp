import React, { useState, useRef } from "react";
import UploadFile from "../helpers/UploadFile";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {

 const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL,setProfilePicURL]= useState(null);

  // Create refs for all input fields
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const profilePicRef = useRef(null);

  const handleProfilePicChange = async(e) => {
    const file =  e.target.files[0]
    const uploadPhoto = await UploadFile(file)
    setProfilePic(URL.createObjectURL(e.target.files[0]))
    setProfilePicURL(uploadPhoto.url)
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data={
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      profile_pic_url:profilePicURL
    }
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/register`
    try {
        const response = await axios.post(url,data)
        toast.success(response.data.message)
        if(response.data.message) navigate('/')
    } catch (error) {
        toast.error(error.response.data.message)
    }
  };

  return (
    <div className="flex justify-center items-center  p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              ref={nameRef} 
              required
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              ref={emailRef} 
              required
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              ref={passwordRef} 
              required
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="profilePic" className="text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              id="profilePic"
              type="file"
              ref={profilePicRef} 
              accept="image/*"
              onChange={handleProfilePicChange}
              className="mt-1"
            />
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="mt-2 w-24 h-24 object-cover rounded-full border border-gray-300"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
