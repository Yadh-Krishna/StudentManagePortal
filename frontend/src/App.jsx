import Login from "./components/User/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/User/Register";
import AdminLogin from "./components/Admin/AdminLogin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/User/Home";

const App=()=>{
    return(        
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/register" element={<Register/>}/>
                <Route path="/admin/login" element={<AdminLogin/>} />
                <Route path="/user/home" element={<Home/>} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default App;
