import Login from "./components/User/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/User/Register";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/User/Home";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

import AdminLogin from "./components/Admin/AdminLogin.jsx";
import AdminDashboard from "./components/Admin/AdminDashBoard.jsx";
// import ProtectedRoute from "./components/Common/ProtectedRoute.jsx";
// import AdminRoute from "./components/Common/AdminRoute.jsx";
// import AuthRoute from "./components/Common/AuthRoute.jsx";
// import AdminAuthRoute from "./components/Common/AdminAuthRoute.jsx";



const App=()=>{
    // const {user}=useSelector((state)=>state.auth);
    // const dispatch=useDispatch();    
    return(        
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/register" element={<Register />} />
                <Route path="/user/home" element={<Home />} />

                 <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default App;
