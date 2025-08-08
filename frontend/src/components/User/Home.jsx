import React, { useRef, useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {updateProfileImage, logout,updateProfile, setUser} from '../../redux/slice/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';


import { User, Mail, Phone, MapPin, Calendar, Clock, Edit, Upload, LogOut } from 'lucide-react'
import ProfileModal from './ProfileModal';

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const fileInputRef = useRef();
  const [isModal, setModal]= useState(false);
  const [errors,setErrors]=useState({});
  
  const [formData, setFormData] = useState({
    first_name: user?.first_name||"",
    last_name:user?.last_name|| "",
    phone: user?.phone||"",
    address: user?.address|| "",
    email_id: user?.email_id||"",
    password: "",
    confirmPassword:"",
    dob : user?.dob||"",
  });

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logged out successfully!")
    navigate('/user/login')
  }

  useEffect(()=>{
        const token= localStorage.getItem('userToken');
        if(token){
            userData= {...user};
            dispatch(setUser({token,user:userData}));
        }
    },[]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
   if (file) { 
    console.log("FILE",file);   
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG, or WEBP image files are allowed.");
      return;
    }
    }
      const formData = new FormData();
      formData.append("image", file);   
      dispatch(updateProfileImage(formData)).unwrap()
      .then(()=>toast.success("Profile updated!"))
      .catch((err)=>toast.error(err));    
    }

    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        }

    const validate = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = "First name is required.";
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = "Last name is required.";
        }

        if (!formData.address || formData.address.trim().split(" ").length >= 10) {
            newErrors.address = "Address must contain atmost 10 words.";
        }

        if (!formData.dob || new Date(formData.dob) > new Date()) {
            newErrors.dob = "Enter a valid Date and it should not be a future date.";
        }

        if (!formData.email_id.trim()) {
        newErrors.email_id = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)) {
        newErrors.email_id = "Valid Email is required";
      }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits.";
        }

        if (formData.password == "") {
        delete formData.password;
        } else {
        if (formData.password !== formData.confirmPassword) {
        newErrors.password = "Passwords do not match.";        
        }    
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)) {
        newErrors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
        }
        }        

        return newErrors;
        };

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // const payload = { ...formData };
        // if (!payload.password){
        //     delete payload.password;
        //     delete payload.confirmPassword;
        // } 
        setErrors({});
        
        dispatch(updateProfile(formData)).unwrap()
        .then(()=>{
            setModal(false);
            toast.success("User updated Successfully !!");            
        })
        .catch((err)=>toast.error(err));
        
        
    }
    

  const formatDate = (dateString) => {
    if (!dateString) return "Not Provided"
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return "Invalid Date"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* <Link
                to="/profile"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link> */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 shadow-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
            
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.first_name}!
          </h2>
          <p className="text-gray-600">Manage your profile and account settings</p>
        </div>

       
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                <ProfileModal isOpen={isModal} formData={formData} handleChange={handleChange}  onClose={() => setModal(false)} handleSubmit={handleSubmit} errors={errors}/>
              
              <div className="relative">
                <img
                    src={user?.profileimageurl||"https://picsum.photos/300/15"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"/>
                
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    name='image'
                    className="hidden"
                />

                <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-lg transition-colors duration-200"
                    title="Upload Picture"
                >
                    <Upload className="w-4 h-4" />
                </button>
                </div>
              
              {/* Basic Info */}
              <div className="text-center sm:text-left text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {user?.first_name} {user?.last_name}
                </h3>
                <p className="text-blue-100 mb-4 flex items-center justify-center sm:justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  {user?.email_id}
                </p>

                <button
                  className="inline-flex items-center px-6 py-2 bg-white text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200 shadow-sm"
                onClick={()=>setModal(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>                             
                
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date of Birth */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Date of Birth</p>
                  <p className="text-gray-600">{formatDate(user?.dob)}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone Number</p>
                  <p className="text-gray-600">{user?.phone || "Not Provided"}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3 md:col-span-2">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">{user?.address || "Not Provided"}</p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Created At */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Account Created</p>
                    <p className="text-gray-600">{formatDate(user?.createdat)}</p>
                  </div>
                </div>

                {/* Updated At */}
                {/* <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Last Updated</p>
                    <p className="text-gray-600">{formatDate(user?.updatedat)}</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>        
      </div>
    </div>
  )
}


export default Home;
