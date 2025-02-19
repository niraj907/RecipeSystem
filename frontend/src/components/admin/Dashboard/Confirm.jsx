import React from "react";
import { X } from "lucide-react";

const Confirm = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Confirm Logout</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>
        <p className="mt-2 text-gray-600">Are you sure you want to log out?</p>
        <div className="mt-4 flex justify-end gap-3">
          <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;