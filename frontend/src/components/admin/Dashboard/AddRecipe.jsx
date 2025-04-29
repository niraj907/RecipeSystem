// import { useState } from "react";
// import { Loader, Plus, X, Image as ImageIcon, Video, Clock, Info } from "lucide-react";
// import { useRecipeStore } from "@/components/store/recipeStore";
// import { toast } from "sonner";

// const AddRecipe = () => {
//   // State variables
//   const [formData, setFormData] = useState({
//     menuId: "",
//     recipeName: "",
//     category: "",
//     description: "",
//     totalTime: "",
//     preparationTime: "",
//     cookingTime: "",
//     nepalVideo:"",
//     hindiVideo:"",
//     englishVideo:""
//   });
//   const [ingredients, setIngredients] = useState([]);
//   const [newIngredient, setNewIngredient] = useState("");
//   const [instructions, setInstructions] = useState([]);
//   const [newInstruction, setNewInstruction] = useState("");
//   const [images, setImages] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [activeTab, setActiveTab] = useState("basic");
//   const { createRecipe } = useRecipeStore();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const addIngredient = () => {
//     if (newIngredient.trim() !== "") {
//       setIngredients([...ingredients, newIngredient]);
//       setNewIngredient("");
//     }
//   };

//   const removeIngredient = (index) => {
//     setIngredients(ingredients.filter((_, i) => i !== index));
//   };

//   const addInstruction = () => {
//     if (newInstruction.trim() !== "") {
//       setInstructions([...instructions, newInstruction]);
//       setNewInstruction("");
//     }
//   };

//   const removeInstruction = (index) => {
//     setInstructions(instructions.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const recipeData = {
//         ...formData,
//         ingredients,
//         instructions,
//         images
//       };

//       const result = await createRecipe(recipeData);

//       if (result.success) {
//         toast.success("Recipe added successfully!");
//         resetForm();
//       } else {
//         toast.error(result.message || "Failed to add recipe");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred");
//       console.error("Submission error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       menuId: "",
//       recipeName: "",
//       category: "",
//       description: "",
//       totalTime: "",
//       preparationTime: "",
//       cookingTime: "",
//       nepalVideo:"",
//       hindiVideo:"",
//       englishVideo:""
//     });
//     setIngredients([]);
//     setNewIngredient("");
//     setInstructions([]);
//     setNewInstruction("");
//     setImages([]);
//     setActiveTab("basic");
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + images.length > 5) {
//       toast.warning("You can upload a maximum of 5 images");
//       return;
//     }
//     setImages(prev => [...prev, ...files]);
//   };

//   const removeImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-10  ">
//       <main className="max-w-4xl mx-auto mt-10 mb-16 px-[5rem]">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//               <span className="inline-block w-8 h-8 bg-orange-500 rounded-full mr-3"></span>
//               Add New Recipe
//             </h2>
            
//             {/* Tabs */}
//             <div className="flex mb-6 border-b">
//               <button 
//                 className={`px-4 py-2 font-medium ${activeTab === 'basic' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
//                 onClick={() => setActiveTab('basic')}
//               >
//                 Basic Info
//               </button>
//               <button 
//                 className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
//                 onClick={() => setActiveTab('details')}
//               >
//                 Details
//               </button>
//               <button 
//                 className={`px-4 py-2 font-medium ${activeTab === 'media' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}
//                 onClick={() => setActiveTab('media')}
//               >
//                 Media
//               </button>
//             </div>
            
//             <form onSubmit={handleSubmit}>
//               {/* Basic Info Tab */}
//               <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Recipe Name */}
//                   <div className="col-span-2">
//                     <label className="block text-gray-700 font-medium mb-2">Recipe Name</label>
//                     <input
//                       type="text"
//                       name="recipeName"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
//                       placeholder="Enter recipe name"
//                       value={formData.recipeName}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
                  
//                   {/* Menu ID */}
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-2">Menu ID</label>
//                     <input
//                       type="number"
//                       name="menuId"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
//                       placeholder="Enter menu ID"
//                       value={formData.menuId}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
                  
//                   {/* Category */}
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-2">Category</label>
//                     <select
//                       name="category"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition bg-white"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <option value="" disabled>Select Category</option>
//                       <option value="breakfast">Breakfast</option>
//                       <option value="lunch">Lunch</option>
//                       <option value="dinner">Dinner</option>
//                       <option value="snacks">Snacks</option>
//                     </select>
//                   </div>
                  
//                   {/* Description */}
//                   <div className="col-span-2">
//                     <label className="block text-gray-700 font-medium mb-2">Description</label>
//                     <textarea
//                       name="description"
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
//                       placeholder="Write a brief description"
//                       rows="4"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       required
//                     ></textarea>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Details Tab */}
//               <div className={activeTab === 'details' ? 'block' : 'hidden'}>
//                 {/* Time info */}
//                 <div className="mb-8">
//                   <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
//                     <Clock className="w-5 h-5 mr-2 text-orange-500" />
//                     Time Information
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Total Time</label>
//                       <input
//                         type="text"
//                         name="totalTime"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
//                         placeholder="e.g. 45 minutes"
//                         value={formData.totalTime}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Preparation Time</label>
//                       <input
//                         type="text"
//                         name="preparationTime"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
//                         placeholder="e.g. 15 minutes"
//                         value={formData.preparationTime}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2">Cooking Time</label>
//                       <input
//                         type="text"
//                         name="cookingTime"
//                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
//                         placeholder="e.g. 30 minutes"
//                         value={formData.cookingTime}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Ingredients */}
//                 <div className="mb-8">
//                   <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
//                     <Info className="w-5 h-5 mr-2 text-orange-500" />
//                     Ingredients
//                   </h3>
//                   <div className="flex gap-2 mb-3">
//                     <input
//                       type="text"
//                       className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
//                       placeholder="Add ingredient (e.g. 2 tbsp olive oil)"
//                       value={newIngredient}
//                       onChange={(e) => setNewIngredient(e.target.value)}
//                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
//                     />
//                     <button
//                       type="button"
//                       className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center"
//                       onClick={addIngredient}
//                     >
//                       <Plus className="w-5 h-5" />
//                     </button>
//                   </div>
                  
//                   <div className="bg-gray-50 rounded-lg p-3 min-h-32 border border-gray-200">
//                     {ingredients.length === 0 ? (
//                       <p className="text-gray-400 text-center py-8">No ingredients added yet</p>
//                     ) : (
//                       <ul className="space-y-2">
//                         {ingredients.map((item, index) => (
//                           <li key={index} className="flex items-center bg-white p-3 rounded-md shadow-sm">
//                             <span className="w-6 h-6 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
//                               {index + 1}
//                             </span>
//                             <span className="flex-1">{item}</span>
//                             <button
//                               type="button"
//                               className="text-red-500 hover:bg-red-50 p-1 rounded-full transition"
//                               onClick={() => removeIngredient(index)}
//                             >
//                               <X className="w-4 h-4" />
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Instructions */}
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
//                     <Info className="w-5 h-5 mr-2 text-orange-500" />
//                     Instructions 
//                   </h3>
//                   <div className="flex gap-2 mb-3">
//                     <input
//                       type="text"
//                       className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
//                       placeholder="Add step (e.g. Heat oil in a large pan)"
//                       value={newInstruction}
//                       onChange={(e) => setNewInstruction(e.target.value)}
//                       onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInstruction())}
//                     />
//                     <button
//                       type="button"
//                       className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center"
//                       onClick={addInstruction}
//                     >
//                       <Plus className="w-5 h-5" />
//                     </button>
//                   </div>
                  
//                   <div className="bg-gray-50 rounded-lg p-3 min-h-32 border border-gray-200">
//                     {instructions.length === 0 ? (
//                       <p className="text-gray-400 text-center py-8">No instructions added yet</p>
//                     ) : (
//                       <ul className="space-y-2">
//                         {instructions.map((item, index) => (
//                           <li key={index} className="flex items-center bg-white p-3 rounded-md shadow-sm">
//                             <span className="w-6 h-6 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
//                               {index + 1}
//                             </span>
//                             <span className="flex-1">{item}</span>
//                             <button
//                               type="button"
//                               className="text-red-500 hover:bg-red-50 p-1 rounded-full transition"
//                               onClick={() => removeInstruction(index)}
//                             >
//                               <X className="w-4 h-4" />
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Media Tab */}
//               <div className={activeTab === 'media' ? 'block' : 'hidden'}>



//                 {/* Image Upload */}
                            
//                   <div className="mb-8">
//                   <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
//                     <ImageIcon className="w-5 h-5 mr-2 text-orange-500" />
//                     Recipe Images 
//                   </h3>
                  
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//                     <input
//                       type="file"
//                       id="image-upload"
//                       multiple
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleFileUpload}
//                     />
//                     <label 
//                       htmlFor="image-upload"
//                       className="cursor-pointer"
//                     >
//                       <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
//                       <p className="mt-2 text-gray-500">Drop images here or click to upload</p>
//                       <p className="text-sm text-gray-400 mt-1">PNG, JPG or JPEG (max 5MB each)</p>
                   
//                     </label>
//                   </div>
                  
//                   {images.length > 0 && (
//                     <div className="mt-6">
//                       <p className="text-sm text-gray-500 mb-2">
//                         {images.length} {images.length === 1 ? 'image' : 'images'} selected
//                         {images.length >= 5 && ' (maximum reached)'}
//                       </p>
//                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                         {images.map((file, index) => (
//                           <div key={index} className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
//                             {file.type.startsWith('image/') ? (
//                               <img 
//                                 src={URL.createObjectURL(file)} 
//                                 alt={`Preview ${index + 1}`}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div className="absolute inset-0 flex items-center justify-center text-gray-400">
//                                 <ImageIcon className="w-8 h-8" />
//                               </div>
//                             )}
//                             <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
//                               {file.name}
//                             </span>
//                             <button
//                               type="button"
//                               className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition"
//                               onClick={() => removeImage(index)}
//                             >
//                               <X className="w-4 h-4 text-red-500" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>


//                 {/* Video upload */}
//                 <div className="mb-8">

                  
//                   <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
//                     <Video className="w-5 h-5 mr-2 text-orange-500" />
//                     Video Information
//                   </h3>
                  
//                   {/* Nepali Video */}
//                   <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
//                     <h4 className="text-md font-medium mb-3">Nepali Video</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   
//                     </div>
//                   </div>
                  
//                   {/* Hindi Video */}
//                   <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
//                     <h4 className="text-md font-medium mb-3">Hindi Video</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     
//                     </div>
//                   </div>
                  
//                   {/* English Video */}
//                   <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                     <h4 className="text-md font-medium mb-3">English Video</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
//                     </div>
//                   </div>
//                 </div>
                

//               </div>
              
//               {/* Form Controls */}
//               <div className="mt-8 pt-6 border-t flex justify-between">
//                 <button
//                   type="button"
//                   className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//                   onClick={resetForm}
//                 >
//                   Reset Form
//                 </button>
                
//                 <div className="flex gap-3">
//                   {activeTab !== 'basic' && (
//                     <button
//                       type="button"
//                       className="px-6 py-2 border border-orange-300 rounded-lg text-orange-500 hover:bg-orange-50 transition"
//                       onClick={() => setActiveTab(activeTab === 'details' ? 'basic' : 'details')}
//                     >
//                       Previous
//                     </button>
//                   )}
                  
//                   {activeTab !== 'media' ? (
//                     <button
//                       type="button"
//                       className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
//                       onClick={() => setActiveTab(activeTab === 'basic' ? 'details' : 'media')}
//                     >
//                       Next
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center disabled:opacity-70"
//                       disabled={isSubmitting || 
//                         !formData.recipeName || 
//                         !formData.menuId || 
//                         !formData.category || 
//                         !formData.description || 
//                         !formData.totalTime || 
//                         !formData.preparationTime || 
//                         !formData.cookingTime || 
//                         ingredients.length === 0 || 
//                         instructions.length === 0 || 
//                         images.length === 0}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <Loader className="animate-spin w-4 h-4 mr-2" />
//                           Submitting...
//                         </>
//                       ) : (
//                         'Add Recipe'
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AddRecipe;





"use client"

import { useState } from "react"
import { Loader, Plus, X, ImageIcon, Video, Clock, Info } from "lucide-react"
import { useRecipeStore } from "@/components/store/recipeStore"
import { toast } from "sonner"

const AddRecipe = () => {
  // State variables
  const [formData, setFormData] = useState({
    menuId: "",
    recipeName: "",
    category: "",
    description: "",
    totalTime: "",
    preparationTime: "",
    cookingTime: "",
  })
  const [ingredients, setIngredients] = useState([])
  const [newIngredient, setNewIngredient] = useState("")
  const [instructions, setInstructions] = useState([])
  const [newInstruction, setNewInstruction] = useState("")
  const [images, setImages] = useState([])
  const [nepalVideo, setNepalVideo] = useState(null)
  const [hindiVideo, setHindiVideo] = useState(null)
  const [englishVideo, setEnglishVideo] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const { createRecipe } = useRecipeStore()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient])
      setNewIngredient("")
    }
  }

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const addInstruction = () => {
    if (newInstruction.trim() !== "") {
      setInstructions([...instructions, newInstruction])
      setNewInstruction("")
    }
  }

  const removeInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

  const handleVideoUpload = (e, language) => {
    const file = e.target.files[0]
    if (!file) return

    // Check if file is a video
    if (!file.type.startsWith("video/")) {
      toast.error(`Please upload a valid video file for ${language} video`)
      return
    }

    // Check file size (limit to 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error(`${language} video file is too large. Maximum size is 100MB`)
      return
    }

    // Set the appropriate video state based on language
    if (language === "Nepali") {
      setNepalVideo(file)
    } else if (language === "Hindi") {
      setHindiVideo(file)
    } else if (language === "English") {
      setEnglishVideo(file)
    }
  }

  const removeVideo = (language) => {
    if (language === "Nepali") {
      setNepalVideo(null)
    } else if (language === "Hindi") {
      setHindiVideo(null)
    } else if (language === "English") {
      setEnglishVideo(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData object to handle file uploads
      const formDataToSubmit = new FormData()

      // Add all text fields
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key])
      })

      // Add arrays as JSON strings
      formDataToSubmit.append("ingredients", JSON.stringify(ingredients))
      formDataToSubmit.append("instructions", JSON.stringify(instructions))

      // Add image files
      images.forEach((image, index) => {
        formDataToSubmit.append(`image-${index}`, image)
      })

      // Add video files if they exist
      if (nepalVideo) formDataToSubmit.append("nepalVideo", nepalVideo)
      if (hindiVideo) formDataToSubmit.append("hindiVideo", hindiVideo)
      if (englishVideo) formDataToSubmit.append("englishVideo", englishVideo)

      const result = await createRecipe(formDataToSubmit)

      if (result.success) {
        toast.success("Recipe added successfully!")
        resetForm()
      } else {
        toast.error(result.message || "Failed to add recipe")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      menuId: "",
      recipeName: "",
      category: "",
      description: "",
      totalTime: "",
      preparationTime: "",
      cookingTime: "",
    })
    setIngredients([])
    setNewIngredient("")
    setInstructions([])
    setNewInstruction("")
    setImages([])
    setNepalVideo(null)
    setHindiVideo(null)
    setEnglishVideo(null)
    setActiveTab("basic")
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + images.length > 5) {
      toast.warning("You can upload a maximum of 5 images")
      return
    }
    setImages((prev) => [...prev, ...files])
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10  ">
      <main className="max-w-4xl mx-auto mt-10 mb-16 px-[5rem]">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="inline-block w-8 h-8 bg-orange-500 rounded-full mr-3"></span>
              Add New Recipe
            </h2>

            {/* Tabs */}
            <div className="flex mb-6 border-b">
              <button
                className={`px-4 py-2 font-medium ${activeTab === "basic" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
                onClick={() => setActiveTab("basic")}
              >
                Basic Info
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "details" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "media" ? "text-orange-500 border-b-2 border-orange-500" : "text-gray-500"}`}
                onClick={() => setActiveTab("media")}
              >
                Media
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Basic Info Tab */}
              <div className={activeTab === "basic" ? "block" : "hidden"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recipe Name */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Recipe Name</label>
                    <input
                      type="text"
                      name="recipeName"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                      placeholder="Enter recipe name"
                      value={formData.recipeName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Menu ID */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Menu ID</label>
                    <input
                      type="number"
                      name="menuId"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                      placeholder="Enter menu ID"
                      value={formData.menuId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Category</label>
                    <select
                      name="category"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition bg-white"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snacks">Snacks</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                      placeholder="Write a brief description"
                      rows="4"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Details Tab */}
              <div className={activeTab === "details" ? "block" : "hidden"}>
                {/* Time info */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-500" />
                    Time Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Total Time</label>
                      <input
                        type="text"
                        name="totalTime"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="e.g. 45 minutes"
                        value={formData.totalTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Preparation Time</label>
                      <input
                        type="text"
                        name="preparationTime"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="e.g. 15 minutes"
                        value={formData.preparationTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Cooking Time</label>
                      <input
                        type="text"
                        name="cookingTime"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                        placeholder="e.g. 30 minutes"
                        value={formData.cookingTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
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
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addIngredient())}
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
                    <Info className="w-5 h-5 mr-2 text-orange-500" />
                    Instructions
                  </h3>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                      placeholder="Add step (e.g. Heat oil in a large pan)"
                      value={newInstruction}
                      onChange={(e) => setNewInstruction(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInstruction())}
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

              {/* Media Tab */}
              <div className={activeTab === "media" ? "block" : "hidden"}>
                {/* Image Upload */}
                <div className="mb-8">
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
                      <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-500">Drop images here or click to upload</p>
                      <p className="text-sm text-gray-400 mt-1">PNG, JPG or JPEG (max 5MB each)</p>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 mb-2">
                        {images.length} {images.length === 1 ? "image" : "images"} selected
                        {images.length >= 5 && " (maximum reached)"}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.map((file, index) => (
                          <div key={index} className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={URL.createObjectURL(file) || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <ImageIcon className="w-8 h-8" />
                              </div>
                            )}
                            <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Video upload */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                    <Video className="w-5 h-5 mr-2 text-orange-500" />
                    Video Information
                  </h3>

                  {/* Nepali Video */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                    <h4 className="text-md font-medium mb-3">Nepali Video</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Upload Video</label>
                        <div className="flex items-center">
                          <input
                            type="file"
                            id="nepali-video-upload"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => handleVideoUpload(e, "Nepali")}
                          />
                          <label
                            htmlFor="nepali-video-upload"
                            className="flex items-center justify-center w-full p-3 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition"
                          >
                            <Video className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="text-gray-500">{nepalVideo ? nepalVideo.name : "Choose video file"}</span>
                          </label>
                          {nepalVideo && (
                            <button
                              type="button"
                              className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                              onClick={() => removeVideo("Nepali")}
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">MP4, WebM or AVI (max 100MB)</p>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Preview</label>
                        {nepalVideo ? (
                          <div className="border border-gray-300 rounded-lg overflow-hidden aspect-video bg-black">
                            <video src={URL.createObjectURL(nepalVideo)} controls className="w-full h-full"></video>
                          </div>
                        ) : (
                          <div className="border border-gray-300 rounded-lg flex items-center justify-center aspect-video bg-gray-50">
                            <Video className="w-8 h-8 text-gray-300" />
                            <span className="ml-2 text-gray-400">No video uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hindi Video */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                    <h4 className="text-md font-medium mb-3">Hindi Video</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Upload Video</label>
                        <div className="flex items-center">
                          <input
                            type="file"
                            id="hindi-video-upload"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => handleVideoUpload(e, "Hindi")}
                          />
                          <label
                            htmlFor="hindi-video-upload"
                            className="flex items-center justify-center w-full p-3 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition"
                          >
                            <Video className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="text-gray-500">{hindiVideo ? hindiVideo.name : "Choose video file"}</span>
                          </label>
                          {hindiVideo && (
                            <button
                              type="button"
                              className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                              onClick={() => removeVideo("Hindi")}
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">MP4, WebM or AVI (max 100MB)</p>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Preview</label>
                        {hindiVideo ? (
                          <div className="border border-gray-300 rounded-lg overflow-hidden aspect-video bg-black">
                            <video src={URL.createObjectURL(hindiVideo)} controls className="w-full h-full"></video>
                          </div>
                        ) : (
                          <div className="border border-gray-300 rounded-lg flex items-center justify-center aspect-video bg-gray-50">
                            <Video className="w-8 h-8 text-gray-300" />
                            <span className="ml-2 text-gray-400">No video uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* English Video */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="text-md font-medium mb-3">English Video</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Upload Video</label>
                        <div className="flex items-center">
                          <input
                            type="file"
                            id="english-video-upload"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => handleVideoUpload(e, "English")}
                          />
                          <label
                            htmlFor="english-video-upload"
                            className="flex items-center justify-center w-full p-3 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition"
                          >
                            <Video className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="text-gray-500">
                              {englishVideo ? englishVideo.name : "Choose video file"}
                            </span>
                          </label>
                          {englishVideo && (
                            <button
                              type="button"
                              className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                              onClick={() => removeVideo("English")}
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">MP4, WebM or AVI (max 100MB)</p>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Preview</label>
                        {englishVideo ? (
                          <div className="border border-gray-300 rounded-lg overflow-hidden aspect-video bg-black">
                            <video src={URL.createObjectURL(englishVideo)} controls className="w-full h-full"></video>
                          </div>
                        ) : (
                          <div className="border border-gray-300 rounded-lg flex items-center justify-center aspect-video bg-gray-50">
                            <Video className="w-8 h-8 text-gray-300" />
                            <span className="ml-2 text-gray-400">No video uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Controls */}
              <div className="mt-8 pt-6 border-t flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  onClick={resetForm}
                >
                  Reset Form
                </button>

                <div className="flex gap-3">
                  {activeTab !== "basic" && (
                    <button
                      type="button"
                      className="px-6 py-2 border border-orange-300 rounded-lg text-orange-500 hover:bg-orange-50 transition"
                      onClick={() => setActiveTab(activeTab === "details" ? "basic" : "details")}
                    >
                      Previous
                    </button>
                  )}

                  {activeTab !== "media" ? (
                    <button
                      type="button"
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                      onClick={() => setActiveTab(activeTab === "basic" ? "details" : "media")}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center disabled:opacity-70"
                      disabled={
                        isSubmitting ||
                        !formData.recipeName ||
                        !formData.menuId ||
                        !formData.category ||
                        !formData.description ||
                        !formData.totalTime ||
                        !formData.preparationTime ||
                        !formData.cookingTime ||
                        ingredients.length === 0 ||
                        instructions.length === 0 ||
                        images.length === 0
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="animate-spin w-4 h-4 mr-2" />
                          Submitting...
                        </>
                      ) : (
                        "Add Recipe"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddRecipe

