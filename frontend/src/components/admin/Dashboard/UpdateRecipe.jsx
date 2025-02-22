import React from 'react';

const UpdateRecipe = ({ recipe, onClose }) => {
  if (!recipe) return null; // If no recipe is selected, return null

  return (
    <div>
      {/* Main modal */}
      <div id="static-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-sm">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Update Recipe
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 space-y-4">
              <p className="text-base leading-relaxed text-gray-500">
                {/* Display recipe details for editing */}
                Recipe Name: {recipe.recipeName}
              </p>
              {/* Add more fields for editing as needed */}
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 border-t">
              <button onClick={onClose} type="button" className="text-white bg-orange-700 hover:bg-orange-800 rounded-lg text-sm px-5 py-2.5">Save Changes</button>
              <button onClick={onClose} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipe;