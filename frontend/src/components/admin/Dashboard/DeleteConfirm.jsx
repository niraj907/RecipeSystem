import React from "react";
import { X } from "lucide-react";
import { MdDelete } from "react-icons/md";

const DeleteConfirm = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-16 sm:w-96 relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={onClose}>
          <X />
        </button>

        {/* Trash Icon in Red Circle */}
        <div className="flex justify-center">
          <div className="bg-red-100 p-3 rounded-full">
            <MdDelete className="text-red-500 w-8 h-8" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold mt-4">Confirm Delete</h2>

        {/* Message */}
        <p className="mt-2 text-gray-600">Are you sure you want to delete the recipe?</p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="py-2 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="py-2 px-5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;

