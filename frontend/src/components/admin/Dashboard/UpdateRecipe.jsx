import React, { useRef, useState } from 'react';

const UpdateRecipe = ({ recipe, onClose }) => {
   const inputRef = useRef(null);
     const [image, setImage] = useState(null);
    // Handle file input click
    const handleImageClick = () => {
      inputRef.current.click();
    };

  if (!recipe) return null; // If no recipe is selected, return null

  return (
    <div>
      {/* Main modal */}
      <div id="static-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-5xl max-h-full ">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg  overflow-y-auto" style={{maxHeight:"90vh"}}>
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 ">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Menu ID */}
              <div>
            <label className="block text-gray-700 font-medium">Menu ID</label>
            <input
              type="number"
              className="w-full p-2 border rounded mt-1"
              value={recipe.menuId}
            />
          </div>


      {/* Recipe Name */}
      <div>
            <label className="block text-gray-700 font-medium">Recipe Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={recipe.name}
             
            />
          </div>

   {/* Nepali Video Name & Link */}
   <div>
            <label className="block text-gray-700 font-medium">Nepali Video Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={recipe.nepalPublishedName}
              
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Nepali Video Link</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={recipe.nepal}
           
            />
          </div>
          

 {/* Hindi Video Name & Link */}
 <div>
            <label className="block text-gray-700 font-medium">Hindi Video Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
             
              value={recipe.hindiPublishedName}
              
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Hindi Video Link</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={recipe.hindi}
            />
          </div>

          {/* English Video Name & Link */}
          <div>
            <label className="block text-gray-700 font-medium">English Video Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={recipe.englishPublishedName}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">English Video Link</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={recipe.english}
            />
          </div>

        <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={recipe.category}
            />
          </div>



          <div>
            <label className="block text-gray-700 font-medium">Total Time</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Total time"
              value={recipe.tot_time}
            
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Preparation Time</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Preparation time"
              value={recipe.prep_time}
              
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Cooking Time</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Cooking time"
              value={recipe.cook_time}
             
            />
          </div>
          
          </div>

          <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            className="w-full p-2 border rounded mt-1"
            value={recipe.description}
          
          ></textarea>
        </div>


          

             {/* Image Upload */}
             <div onClick={handleImageClick} className="cursor-pointer relative">
             <label className="block text-gray-700 font-medium">Image</label>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded Preview"
                className="w-24 h-24  object-cover mt-4 sm:mt-0"
              />
            ) : (
              <img
                src={recipe?.images?.[0]?.url || "/default-profile.png"}
                className="w-24 h-24  object-cover mt-4 sm:mt-0"
                alt="User Profile"
              />
            )}
            <input
              type="file"
              ref={inputRef}
              accept="image/*"
         
              className="hidden"
            />
          </div>


          <div>
          <label className="block text-gray-700 font-medium">Instructions</label>
          <div className="space-y-4">
          {recipe.instructions.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 min-w-[2rem] min-h-[2rem] bg-orange-500 text-white text-lg font-bold rounded-full">
                {index + 1}
              </div>
              <p className="text-gray-700 text-base sm:text-lg flex-1">{step}</p>
            </div>
          ))}
        </div>
            </div>
          <div>
          <label className="block text-gray-700 font-medium">Ingredients</label>
          <div className="space-y-4">
          {recipe.ingredients.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-8 h-8 min-w-[2rem] min-h-[2rem] bg-orange-500 text-white text-lg font-bold rounded-full">
                {index + 1}
              </div>
              <p className="text-gray-700 text-base sm:text-lg flex-1">{step}</p>
            </div>
          ))}
        </div>
            </div>



            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4">
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




