import React from 'react';
import { useDispatch } from 'react-redux';

  const ProfileModal = ({isOpen,formData, handleChange, onClose, handleSubmit,errors}) => {   
    
     if (!isOpen) return null;

  return ( 
  <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
  style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
>
  <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
    <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium">First Name</label>
        <input
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <input
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email_id"
          type="email"
          value={formData.email_id}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.email_id && <p className="text-red-500 text-sm mt-1">{errors.email_id}</p>}
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <input
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          name="phone"
          type="number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          rows="3"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      {/* Password and Confirm Password */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium">Password (optional)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium">Confirm Password(optional)</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
               
      </div>
      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>
  );
}

export default ProfileModal;
