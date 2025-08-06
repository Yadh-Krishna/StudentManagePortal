import React from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { logout } from '../../redux/slice/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const Home = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const {user}=useSelector((state)=>state.auth);
    const handleLogout=()=>{
        dispatch(logout());
        toast.success("Logged out successfully!");    
        navigate('/user/login');
    }
  return (
       <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-grey shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">User Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              src={user?.profile_pic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border"
            />
            <Link
              to="/profile/upload"
              className="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium"
            >
              Upload Picture
            </Link>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-gray-600">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-gray-600">
              <strong>Date of Birth:</strong> {user?.dob || "Not Provided"}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {user?.phone || "Not Provided"}
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> {user?.address || "Not Provided"}
            </p>
            <p className="text-gray-600">
              <strong>Created At:</strong> {user?.created_at || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Updated At:</strong> {user?.updated_at || "N/A"}
            </p>

            {/* Actions */}
            <div className="mt-4">
              <Link
                to="/profile/edit"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Update Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home
