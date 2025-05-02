import React from 'react';
import { IoClose } from 'react-icons/io5';

const UserView = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-0">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Detailed Information</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:bg-gray-200 p-2 rounded-lg transition-colors"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.images?.[0]?.url || "https://github.com/shadcn.png"}
              alt="User"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div>
              <label className="text-sm text-gray-500">Username</label>
              <p className="font-medium break-all">{user.username}</p>
            </div>


            <div>
              <label className="text-sm text-gray-500">Gender</label>
              <p className="font-medium break-all">{user.gender}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Country</label>
              <p className="font-medium">{user.country || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Registration Date</label>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;