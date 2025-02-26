import React, { useRef, useState } from "react";
import { useRecipeStore } from "@/components/store/recipeStore";
import { toast } from "sonner";

const UpdateRecipe = ({ recipe, onClose }) => {
  const { updateRecipe } = useRecipeStore();
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    menuId: recipe.menuId,
    name: recipe.name,
    nepalPublishedName: recipe.nepalPublishedName,
    nepal: recipe.nepal,
    hindiPublishedName: recipe.hindiPublishedName,
    hindi: recipe.hindi,
    englishPublishedName: recipe.englishPublishedName,
    english: recipe.english,
    category: recipe.category,
    tot_time: recipe.tot_time,
    prep_time: recipe.prep_time,
    cook_time: recipe.cook_time,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
  });

  const handleImageClick = () => {
    inputRef.current.click();
  };

  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      setImage(file);
    }
  };

  const handleInputChange = (e, field, index) => {
    const value = e.target.value;
    if (field === "ingredients" || field === "instructions") {
      const updatedArray = [...formData[field]];
      updatedArray[index] = value;
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  // In UpdateRecipe component's handleUpdateRecipe function
const handleUpdateRecipe = async () => {
  try {
    const updatedRecipe = { ...formData };
    if (image) {
      updatedRecipe.images = [image]; // Send as array under 'images' key
    }
    await updateRecipe(recipe._id, updatedRecipe);
    toast.success("Recipe updated successfully!");
    onClose();
  } catch (error) {
    toast.error("Failed to update recipe.");
    console.error(error);
  }
};
  if (!recipe) return null;

  return (
    <div>
      <div
        id="static-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-5xl max-h-full">
          <div
            className="relative bg-white rounded-lg overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            <div className="flex items-center justify-between p-4">
              
              <h3 className="text-xl font-semibold text-gray-900">
                Update Recipe
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium">
                    Menu ID
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.menuId}
                    onChange={(e) => handleInputChange(e, "menuId")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Recipe Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Nepali Video Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.nepalPublishedName}
                    onChange={(e) => handleInputChange(e, "nepalPublishedName")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Nepali Video Link
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.nepal}
                    onChange={(e) => handleInputChange(e, "nepal")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Hindi Video Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.hindiPublishedName}
                    onChange={(e) => handleInputChange(e, "hindiPublishedName")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Hindi Video Link
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.hindi}
                    onChange={(e) => handleInputChange(e, "hindi")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    English Video Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.englishPublishedName}
                    onChange={(e) => handleInputChange(e, "englishPublishedName")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    English Video Link
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.english}
                    onChange={(e) => handleInputChange(e, "english")}
                  />
                </div>
              
                <div>
  <label
    className="font-medium text-gray-700 block"
    htmlFor="category"
  >
    Category
  </label>
  <select
    name="category"
    id="category"
    value={formData.category}
    onChange={(e) => handleInputChange(e, "category")}
    className="w-full focus-visible:ring-transparent mt-1"
  >
    <option value="breakfast">Breakfast</option>
    <option value="lunch">Lunch</option>
    <option value="dinner">Dinner</option>
    <option value="snacks">Snacks</option>
  </select>
</div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Total Time
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.tot_time}
                    onChange={(e) => handleInputChange(e, "tot_time")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Preparation Time
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.prep_time}
                    onChange={(e) => handleInputChange(e, "prep_time")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Cooking Time
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={formData.cook_time}
                    onChange={(e) => handleInputChange(e, "cook_time")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded mt-1 min-h-32 resize-y"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e, "description")}
                  ></textarea>
                </div>
               
                <div
                  onClick={handleImageClick}
                  className="cursor-pointer relative"
                >
                  <label className="block text-gray-700 font-medium mb-1">
                    Image
                  </label>
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Preview"
                      className="w-32 h-32 object-cover mt-4 sm:mt-0"
                    />
                  ) : (
                    <img
                      src={recipe?.images?.[0]?.url || "/default-profile.png"}
                      className="w-32 h-32 object-cover mt-4 sm:mt-0"
                      alt="User Profile"
                    />
                  )}
                  <input
                    type="file"
                    ref={inputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Ingredients
                </label>
                <div className="space-y-4">
                  {formData.ingredients.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <input
                        type="text"
                        className="w-full p-2 border rounded mt-1"
                        value={step}
                        onChange={(e) => handleInputChange(e, "ingredients", index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Instructions
                </label>
                <div className="space-y-4">
                  {formData.instructions.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <input
                        type="text"
                        className="w-full p-2 border rounded mt-1"
                        value={step}
                        onChange={(e) => handleInputChange(e, "instructions", index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center p-4">
              <button
                type="button"
                onClick={handleUpdateRecipe}
                className="text-white bg-orange-500 hover:bg-orange-300 rounded-lg text-sm px-5 py-2.5"
              >
                Edit Change
              </button>
              <button
                onClick={onClose}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipe;