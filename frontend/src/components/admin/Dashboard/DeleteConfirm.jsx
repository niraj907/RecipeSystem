import React from "react";
import { X } from "lucide-react";

const DeleteConfirm = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Confirm Delete</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>
        <p className="mt-2 text-gray-600">Are you sure you want to delete the recipe?</p>
        <div className="mt-4 flex justify-end gap-3">
          <button className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm





