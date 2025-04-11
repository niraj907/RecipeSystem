import { useState } from "react";
import UploaderRecipe from "@/components/admin/Dashboard/UploaderRecipe";
import { useRecipeStore } from "@/components/store/recipeStore";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const AddRecipe = () => {

  const { createRecipe, loading: storeLoading } = useRecipeStore();
  // State variables
  const [menuId, setMenuId] = useState("");
  const [ingredients, setIngredients] = useState([]); // Store ingredients as an array
  const [newIngredient, setNewIngredient] = useState(""); // Store the current input value
  const [instructions, setInstructions] = useState([]); // Store instructions as an array
  const [newInstruction, setNewInstruction] = useState(""); // Store the current input value
  const [recipeName, setRecipeName] = useState(""); // Store recipe name
  const [nepaliVideoName, setNepaliVideoName] = useState(""); // Store Nepali video name
  const [nepaliVideoLink, setNepaliVideoLink] = useState(""); // Store Nepali video link
  const [hindiVideoName, setHindiVideoName] = useState(""); // Store Hindi video name
  const [hindiVideoLink, setHindiVideoLink] = useState(""); // Store Hindi video link
  const [englishVideoName, setEnglishVideoName] = useState(""); // Store English video name
  const [englishVideoLink, setEnglishVideoLink] = useState(""); // Store English video link
  const [description, setDescription] = useState(""); // Store description
  const [category, setCategory] = useState(""); // Store category
  const [totalTime, setTotalTime] = useState(""); // Store total time
  const [preparationTime, setPreparationTime] = useState(""); // Store preparation time
  const [cookingTime, setCookingTime] = useState(""); // Store cooking time
  const [images, setImages] = useState([]); // Store images as an array images: [], // Array to store selected image files
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate Menu ID (no negative numbers)
  const handleMenuIdChange = (e) => {
    const value = e.target.value;
    console.log("Menu ID Changed:", value);
    if (value === "") {
      setMenuId("");
      return;
    }

    const numericValue = Number(value);
    if (numericValue < 0) {
      toast.error("Negative numbers are not allowed!");
      setMenuId("");
    } else {
      setMenuId(value);
    }
  };

  // Handle adding ingredients
  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      console.log("Adding Ingredient:", newIngredient);
      setIngredients([...ingredients, newIngredient]); // Add new ingredient to the array
      setNewIngredient(""); // Clear input field
    } else {
      toast.error("Ingredient cannot be empty!");
    }
  };

  // Handle removing an ingredient
  const removeIngredient = (index) => {
    console.log("Removing Ingredient at Index:", index);
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Handle adding Instructions
  const addInstruction = () => {
    if (newInstruction.trim() !== "") {
      console.log("Adding Instruction:", newInstruction);
      setInstructions([...instructions, newInstruction]); // Add new instruction to the array
      setNewInstruction(""); // Clear input field
    } else {
      toast.error("Instruction cannot be empty!");
    }
  };

  // Handle removing an instruction
  const removeInstruction = (index) => {
    console.log("Removing Instruction at Index:", index);
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const recipeData = {
      menuId,
      name: recipeName,
      category,
      description,
      ingredients,
      instructions,
      tot_time: totalTime,
      prep_time: preparationTime,
      cook_time: cookingTime,
      nepal: nepaliVideoLink,
      nepalPublishedName: nepaliVideoName,
      hindi: hindiVideoLink,
      hindiPublishedName: hindiVideoName,
      english: englishVideoLink,
      englishPublishedName: englishVideoName,
      images,
    };
    console.log("Images before submitting:", images);
console.log("RecipeData: ", recipeData);
    setIsSubmitting(true);
    try {
    const response = await createRecipe(recipeData);
    console.log("API Responsing:", response);

    if (response.success) {
      toast.success("Recipe added successfully!");
      reset();
    } else {
      toast.error(response.message);
    }
  }
     catch (error) {
      console.error("Error in Submission:", error);
      toast.error("Something went wrong!");
    }finally {
      setIsSubmitting(false);
    }
  };
  

  // Reset form fields
  const reset = () => {
    setMenuId("");
    setIngredients([]);
    setNewIngredient("");
    setInstructions([]);
    setNewInstruction("");
    setRecipeName("");
    setNepaliVideoName("");
    setNepaliVideoLink("");
    setHindiVideoName("");
    setHindiVideoLink("");
    setEnglishVideoName("");
    setEnglishVideoLink("");
    setDescription("");
    setCategory("");
    setTotalTime("");
    setPreparationTime("");
    setCookingTime("");
    setImages(null); // Reset images
  };

  return (
    <div className="max-w-3xl mx-auto pt-24 px-6 pb-10">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center">Add a New Recipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Menu ID */}
          <div>
            <label className="block text-gray-700 font-medium">Menu ID:</label>
            <input
              type="number"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter menu ID"
              value={menuId}
              onChange={handleMenuIdChange}
            />
          </div>

          {/* Recipe Name */}
          <div>
            <label className="block text-gray-700 font-medium">Recipe Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter recipe name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>

          {/* Nepali Video Name & Link */}
          <div>
            <label className="block text-gray-700 font-medium">Nepali Video Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter Nepali video name"
              value={nepaliVideoName}
              onChange={(e) => setNepaliVideoName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Nepali Video Link:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter Nepali video link"
              value={nepaliVideoLink}
              onChange={(e) => setNepaliVideoLink(e.target.value)}
            />
          </div>

          {/* Hindi Video Name & Link */}
          <div>
            <label className="block text-gray-700 font-medium">Hindi Video Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter Hindi video name"
              value={hindiVideoName}
              onChange={(e) => setHindiVideoName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Hindi Video Link:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter Hindi video link"
              value={hindiVideoLink}
              onChange={(e) => setHindiVideoLink(e.target.value)}
            />
          </div>

          {/* English Video Name & Link */}
          <div>
            <label className="block text-gray-700 font-medium">English Video Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter English video name"
              value={englishVideoName}
              onChange={(e) => setEnglishVideoName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">English Video Link:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter English video link"
              value={englishVideoLink}
              onChange={(e) => setEnglishVideoLink(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Ingredients:</label>
          <div className="flex gap-2 mt-2 items-center">
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Enter ingredient"
            />
            <button
              type="button"
              className="bg-orange-500 text-white w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full text-sm hover:bg-orange-600 md:w-8 md:h-8 sm:w-6 sm:h-6"
              onClick={addIngredient}
            >
              +
            </button>
          </div>
          {/* Show the list of added ingredients */}
          <ul className="mt-2">
            {ingredients.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2">
                <li className="text-gray-700 flex-1 break-words">{item}</li>
                <button
                  type="button"
                  className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm hover:bg-red-600"
                  onClick={() => removeIngredient(index)}
                >
                  x
                </button>
              </div>
            ))}
          </ul>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Instructions:</label>
          <div className="flex gap-2 mt-2 items-center">
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              placeholder="Enter instruction"
            />
            <button
              type="button"
              className="bg-orange-500 text-white w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full text-sm hover:bg-orange-600 md:w-8 md:h-8 sm:w-6 sm:h-6"
              onClick={addInstruction}
            >
              +
            </button>
          </div>
          {/* Show the list of added Instructions */}
          <ul className="mt-2">
            {instructions.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2">
                <li className="text-gray-700 flex-1 break-words">{item}</li>
                <button
                  type="button"
                  className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm hover:bg-red-600"
                  onClick={() => removeInstruction(index)}
                >
                  x
                </button>
              </div>
            ))}
          </ul>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description:</label>
          <textarea
            className="w-full p-2 border rounded mt-1"
            placeholder="Write a brief description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Category, Times */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Category:</label>
            <select
              className="w-full p-2 border rounded mt-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>Select Category</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Total Time:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Total time"
              value={totalTime}
              onChange={(e) => setTotalTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Preparation Time:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Preparation time"
              value={preparationTime}
              onChange={(e) => setPreparationTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Cooking Time:</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              placeholder="Cooking time"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
            />
          </div>

          
        </div>




        {/* Uploader Component */}
        <UploaderRecipe
          onFilesSelected={setImages} // Pass the setImages function to the uploader
          images={images} // Pass the images state to the uploader
        />
        { images !== null &&
        images?.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            Selected Images: {images.map((file) => file.name).join(", ")}
          </p>
        )}

          <button
          type="submit"
          className={`w-full bg-orange-500 text-white p-2 rounded mt-3 ${isSubmitting || storeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting || storeLoading}
        >
          {(isSubmitting || storeLoading) ? <Loader className="animate-spin inline-block" /> : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;