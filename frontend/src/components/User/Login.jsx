import React,{useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import {loginUser, clearError} from "../../redux/slice/authSlice";
import { toast } from 'react-toastify';


const Login = () => {
  const navigate= useNavigate();
  const dispatch=useDispatch();
  const {loading,error}=useSelector((state)=>state.auth)
  const [errors, setErrors]= useState({});
  const [formData,setFormData]=useState({
  email_id:"",
  password:""
 })

 const handleChange=(e)=>{  
  setFormData({
    ...formData,
    [e.target.name] : e.target.value,
  })
 }

  const validate = () => {
      const newErrors = {};
      if (!formData.email_id.trim()) {
        newErrors.email_id = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)) {
        newErrors.email_id = "Valid Email is required";
      }

      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)) {
        newErrors.password = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
      }

      return newErrors;
    };

 const handleSubmit=async(e)=>{
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});
  try {
        const result = await dispatch(loginUser(formData)).unwrap();
        
        // if (result.user.role === "admin") {
        //   toast.error("Access denied. Please login via admin page.");
        //   navigate("/admin/login");
        //   return;
        // }
        if(result.data){
        toast.success("User Login Successfull");
        navigate("/user/home");
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">User Login</h2>
        </div>
        <form  noValidate className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error.message}</div>}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email"
                name="email_id"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email_id && (
              <p className="text-red-500 text-sm mt-1">{errors.email_id}</p>
              )}
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
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
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-center">
            <Link to="/user/register" className="text-indigo-600 hover:text-indigo-500">
              Don't have an account? Sign up
            </Link>
          </div>

          <div className="text-center">
            <Link to="/admin/login" className="text-gray-600 hover:text-gray-500">
              Admin Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

