import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  { registerUser,clearError } from '../../redux/slice/authSlice';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Register = () => {
    const dispatch= useDispatch();
    const navigate=useNavigate()
    const {loading, error}= useSelector((state)=>state.auth);
    const [errors, setErrors]= useState({});

    const [formData, setFormData] = useState({
    email_id: "",
    password: "",
    confirmPassword:"",
    firstName: "",
    lastName: "",
  });

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
      const newErrors = {};
      if (!formData.firstName.trim()||!formData.lastName.trim()) {
        newErrors.firstName = "Provide valid First name & Last name";
      }
      // if (!formData.username) {
      //   newErrors.email_id = "Provide valid First name & Last name is required";
      // }

      if (!formData.email_id.trim()) {
        newErrors.email_id = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)) {
        newErrors.email_id = "Valid Email is required";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.password = "Password does not match";
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)) {
        newErrors.password = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
      }

      return newErrors;
    };


   const handleSubmit = async(e) => {
    e.preventDefault();
     const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
    }
    setErrors({});

    // dispatch(registerUser(formData));

    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      
      // if (result.user.role === "admin") {
      //   toast.error("Access denied. Please login via admin page.");
      //   navigate("/admin/login");
      //   return;
      // }
      if(result.student){
      toast.success(result.message);
      navigate("/user/login");
      }else{
        toast.error("User not found");        
      }
    } catch (err) {
      toast.error(err || "Login failed. Please try again.");
    }
    dispatch(clearError());
    
  }  
  
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

          <div className="space-y-4">
            <div className="flex space-x-4">
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
               {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}             
            </div>
            {/* <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            /> */}
            <div>
            <input
              id="email"
              name="email_id"
              type="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={formData.email_id}
              onChange={handleChange}
            />
             {errors.email_id && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}  
            </div>
            <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )} 
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center">
            <Link to="/user/login" className="text-indigo-600 hover:text-indigo-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
