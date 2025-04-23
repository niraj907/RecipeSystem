import React, { useState } from 'react';
import { useAuthStore } from './store/authStore';
import { toast } from 'sonner';
import { IoClose, IoEyeOff, IoEye } from 'react-icons/io5';

const ChangePassword = ({ user, onClose }) => {
  const { updatePassword } = useAuthStore(); // Corrected function name

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    try {
      // Call updatePassword with all required fields
      await updatePassword(
        passwords.currentPassword,
        passwords.newPassword,
        passwords.confirmPassword
      );
      
      toast.success("Password changed successfully!");
      onClose();
    } catch (error) {
      toast.error(error.error || "Failed to change password");
    }
  };

  const handleInputChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-0">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Change Password</h3>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-200 p-2 rounded-lg">
            <IoClose className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword.current ? 'text' : 'password'}
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleInputChange}
                className="w-full p-2 border rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={() => toggleVisibility('current')}
                className="absolute top-3 right-2 text-gray-500"
              >
                {showPassword.current ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPassword.new ? 'text' : 'password'}
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleInputChange}
                className="w-full p-2 border rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={() => toggleVisibility('new')}
                className="absolute top-3 right-2 text-gray-500"
              >
                {showPassword.new ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPassword.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={() => toggleVisibility('confirm')}
                className="absolute top-3 right-2 text-gray-500"
              >
                {showPassword.confirm ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
            >
              Change Password
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;