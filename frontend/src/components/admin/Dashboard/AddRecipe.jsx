import { useState } from "react";
import { Loader,Plus, X, Image as ImageIcon, Video, Clock, Info } from "lucide-react";
import { useRecipeStore } from "@/components/store/recipeStore";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";

const AddRecipe = ({ onClose }) => {
  const [formData, setFormData] = useState({
    menuId: "",
    recipeName: "",
    category: "",
    description: "",
    totalTime: "",
    preparationTime: "",
    cookingTime: "",
    nepaliVideoName: "",
    nepaliVideoLink: "",
    hindiVideoName: "",
    hindiVideoLink: "",
    englishVideoName: "",
    englishVideoLink: "",
  });
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [newInstruction, setNewInstruction] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const { createRecipe } = useRecipeStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([...instructions, newInstruction.trim()]);
      setNewInstruction("");
    }
  };

  const removeInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      toast.warning("Maximum 5 images allowed");
      return;
    }
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      menuId: "",
      recipeName: "",
      category: "",
      description: "",
      totalTime: "",
      preparationTime: "",
      cookingTime: "",
      nepaliVideoName: "",
      nepaliVideoLink: "",
      hindiVideoName: "",
      hindiVideoLink: "",
      englishVideoName: "",
      englishVideoLink: "",
    });
    setIngredients([]);
    setInstructions([]);
    setImages([]);
    setActiveTab("basic");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const recipeData = {
      ...formData,
      ingredients,
      instructions,
      images
    };

    try {
      const result = await createRecipe(recipeData);
      if (result.success) {
        toast.success("Recipe added successfully!");
        resetForm();
        onClose();
      } else {
        toast.error(result.message || "Failed to add recipe");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const basicValid = formData.recipeName && formData.menuId && formData.category && formData.description;
    const detailsValid = formData.totalTime && formData.preparationTime && formData.cookingTime && ingredients.length > 0 && instructions.length > 0;
    const mediaValid = images.length > 0;
    
    return activeTab === "basic" ? basicValid :
           activeTab === "details" ? detailsValid :
           mediaValid;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white  w-full max-w-4xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Recipe</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-4 mb-6 border-b">
          {["basic", "details", "media"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 capitalize font-medium ${
                activeTab === tab
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-gray-700 mb-2 font-medium">Recipe Name</label>
                <input
                  type="text"
                  name="recipeName"
                  className="w-full p-2 border rounded-lg"
                  value={formData.recipeName}
                  placeholder="Enter recipe name"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Menu ID</label>
                <input
                  type="number"
                  name="menuId"
                  className="w-full p-2 border rounded-lg"
                   placeholder="Enter menu ID"
                  value={formData.menuId}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Category</label>
                <select
                  name="category"
                  className="w-full p-2 border rounded-lg bg-white"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snacks">Snacks</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-gray-700 mb-2 font-medium">Description</label>
                <textarea
                  name="description"
                  className="w-full p-2 border rounded-lg h-32"
                  value={formData.description}
                  placeholder="Write a brief description"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">      
                               <Clock className="w-5 h-5 mr-2 text-orange-500" />
                   Time Information
                </h3>
                  <input
                    type="text"
                    name="totalTime"
                    className="w-full p-2 border rounded-lg"
                     placeholder="e.g. 45 minutes"
                    value={formData.totalTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
               
                  <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">     
                  Prep Time 
                </h3>
                  <input
                    type="text"
                    name="preparationTime"
                    className="w-full p-2 border rounded-lg"
                     placeholder="e.g. 15 minutes"
                    value={formData.preparationTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">     
                Cook Time 
                </h3>
                  <input
                    type="text"
                    name="cookingTime"
                    className="w-full p-2 border rounded-lg"
                     placeholder="e.g. 30 minutes"
                    value={formData.cookingTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>


 {/* Ingredients */}
              <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-orange-500" />
                    Ingredients
                 </h3>
                <div className="flex gap-2 mb-3">
                <input
                      type="text"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                      placeholder="Add ingredient (e.g. 2 tbsp olive oil)"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                    />
                  <button
                      type="button"
                      className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center"
                      onClick={addIngredient}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 min-h-32 border border-gray-200">
                    {ingredients.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No ingredients added yet</p>
                    ) : (
                      <ul className="space-y-2">
                        {ingredients.map((item, index) => (
                          <li key={index} className="flex items-center bg-white p-3 rounded-md shadow-sm">
                            <span className="w-6 h-6 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="flex-1">{item}</span>
                            <button
                              type="button"
                              className="text-red-500 hover:bg-red-50 p-1 rounded-full transition"
                              onClick={() => removeIngredient(index)}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

 {/* Instructions */}
              <div>
                              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
         <Info className="w-5 h-5 mr-2 text-orange-500" /> Instructions 
                 </h3>
                <div className="flex gap-2 mb-3">
                                  <input                       type="text"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                       placeholder="Add step (e.g. Heat oil in a large pan)"
                       value={newInstruction}
                       onChange={(e) => setNewInstruction(e.target.value)}
                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInstruction())}
               />
                    <button
                      type="button"
                      className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center"
                      onClick={addInstruction}
                     >
                      <Plus className="w-5 h-5" />
                   </button>
                  </div>
           
                                 <div className="bg-gray-50 rounded-lg p-3 min-h-32 border border-gray-200">
                    {instructions.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No instructions added yet</p>
                    ) : (
                      <ul className="space-y-2">
                       {instructions.map((item, index) => (
                           <li key={index} className="flex items-center bg-white p-3 rounded-md shadow-sm">
                             <span className="w-6 h-6 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                               {index + 1}
                             </span>
                             <span className="flex-1">{item}</span>
                             <button
                               type="button"
                               className="text-red-500 hover:bg-red-50 p-1 rounded-full transition"
                               onClick={() => removeInstruction(index)}
                             >
                               <X className="w-4 h-4" />
                             </button>
                           </li>
                         ))}
                       </ul>
                    )}
                   </div>
                 </div>
            </div>

                  )}


          {activeTab === "media" && (
            <div className="space-y-8">
              <div>
                               <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
         <ImageIcon className="w-5 h-5 mr-2 text-orange-500" />
                    Recipe Images 
             </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Drag & drop or click to upload</p>
                    <p className="text-sm text-gray-400 mt-2">Max 5 images (JPEG, PNG)</p>
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {images.map((file, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                             <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
         <Video className="w-5 h-5 mr-2 text-orange-500" />
                     Video Information
                   </h3>
                {["nepali", "hindi", "english"].map((lang) => (
                  <div key={lang} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="capitalize font-medium mb-4">{lang} Video</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Video Name</label>
                        <input
                          type="text"
                          name={`${lang}VideoName`}
                          className="w-full p-2 border rounded-lg"
                          value={formData[`${lang}VideoName`]}
                             placeholder={`Enter ${lang} video name`}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Video URL</label>
                        <input
                          type="url"
                          name={`${lang}VideoLink`}
                          className="w-full p-2 border rounded-lg"
                          value={formData[`${lang}VideoLink`]}
                          placeholder={`Enter ${lang} video link`}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Controls */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <div className="space-x-4">
              {activeTab !== "basic" && (
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === "details" ? "basic" : "details")}
                  className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Reset Form
              </button>
            </div>

            {activeTab === "media" ? (
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader className="animate-spin inline-block mr-2" />
                ) : null}
                {isSubmitting ? "Submitting..." : "Create Recipe"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === "basic" ? "details" : "media")}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                disabled={!isFormValid()}
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;