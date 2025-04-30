import React from "react";
import { X } from "lucide-react";
import { MdLogout } from "react-icons/md";

const Confirm = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96 relative">
        {/* Close button */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={onClose}>
          <X />
        </button>

        {/* Logout Icon inside circle */}
        <div className="flex justify-center">
          <div className="bg-orange-100 p-3 rounded-full">
            <MdLogout className="text-orange-500 w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold mt-4">Confirm Logout</h2>

        {/* Message */}
        <p className="text-center mt-2 text-gray-600">
          Are you sure you want to log out?
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="px-5 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
