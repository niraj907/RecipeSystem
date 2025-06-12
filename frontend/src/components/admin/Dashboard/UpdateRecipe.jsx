import { useRef, useState, useEffect } from "react"
import { useRecipeStore } from "@/components/store/recipeStore"
import { toast } from "sonner"
import { X, Upload, Plus, Trash2, Clock, Info, Video, ImageIcon, Save } from "lucide-react"
import { Loader } from "lucide-react";
const UpdateRecipe = ({ recipe, onClose }) => {
  const { updateRecipe } = useRecipeStore()
  const imageInputRef = useRef(null)
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  // State for image
  const [image, setImage] = useState(null)

  // State for videos
  const [nepalVideo, setNepalVideo] = useState(null)
  const [hindiVideo, setHindiVideo] = useState(null)
  const [englishVideo, setEnglishVideo] = useState(null)

  // Form data state
  const [formData, setFormData] = useState({
    menuId: recipe.menuId || "",
    name: recipe.name || "",
    category: recipe.category || "breakfast",
    tot_time: recipe.tot_time || "",
    prep_time: recipe.prep_time || "",
    cook_time: recipe.cook_time || "",
    description: recipe.description || "",
    ingredients: recipe.ingredients || [],
    instructions: recipe.instructions || [],
  })

  // New ingredient/instruction state
  const [newIngredient, setNewIngredient] = useState("")
  const [newInstruction, setNewInstruction] = useState("")

  // Log recipe data for debugging
  useEffect(() => {
    console.log("Recipe data:", recipe)
  }, [recipe])

  // Handle image selection
  const handleImageClick = () => {
    imageInputRef.current.click()
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file")
        return
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image file is too large. Maximum size is 5MB")
        return
      }

      setImage(file)
    }
  }

  // Handle video uploads
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

  // Remove video
  const removeVideo = (language) => {
    if (language === "Nepali") {
      setNepalVideo(null)
    } else if (language === "Hindi") {
      setHindiVideo(null)
    } else if (language === "English") {
      setEnglishVideo(null)
    }
  }

  // Handle form input changes
  const handleInputChange = (e, field, index) => {
    const value = e.target.value

    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: null,
      })
    }

    if (field === "ingredients" || field === "instructions") {
      const updatedArray = [...formData[field]]
      updatedArray[index] = value
      setFormData({ ...formData, [field]: updatedArray })
    } else {
      setFormData({ ...formData, [field]: value })
    }
  }

  // Add new ingredient
  const addIngredient = () => {
    if (newIngredient.trim() !== "") {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, newIngredient],
      })
      setNewIngredient("")
    }
  }

  // Remove ingredient
  const removeIngredient = (index) => {
    const updatedIngredients = [...formData.ingredients]
    updatedIngredients.splice(index, 1)
    setFormData({ ...formData, ingredients: updatedIngredients })
  }

  // Add new instruction
  const addInstruction = () => {
    if (newInstruction.trim() !== "") {
      setFormData({
        ...formData,
        instructions: [...formData.instructions, newInstruction],
      })
      setNewInstruction("")
    }
  }

  // Remove instruction
  const removeInstruction = (index) => {
    const updatedInstructions = [...formData.instructions]
    updatedInstructions.splice(index, 1)
    setFormData({ ...formData, instructions: updatedInstructions })
  }

  // Validate form
  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Recipe name is required"
    }

    if (!formData.menuId) {
      errors.menuId = "Menu ID is required"
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }

    if (!formData.tot_time.trim()) {
      errors.tot_time = "Total time is required"
    }

    if (!formData.prep_time.trim()) {
      errors.prep_time = "Preparation time is required"
    }

    if (!formData.cook_time.trim()) {
      errors.cook_time = "Cooking time is required"
    }

    if (formData.ingredients.length === 0) {
      errors.ingredients = "At least one ingredient is required"
    }

    if (formData.instructions.length === 0) {
      errors.instructions = "At least one instruction is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission with setTimeout
  const handleUpdateRecipe = async () => {
    // Validate form
    if (!validateForm()) {
      // Show error toast and switch to the tab with errors
      toast.error("Please fix the errors in the form")

      // Determine which tab has errors
      const basicFields = ["name", "menuId", "description"]
      const detailsFields = ["tot_time", "prep_time", "cook_time", "ingredients", "instructions"]

      const hasBasicErrors = basicFields.some((field) => formErrors[field])
      const hasDetailsErrors = detailsFields.some((field) => formErrors[field])

      if (hasBasicErrors) {
        setActiveTab("basic")
      } else if (hasDetailsErrors) {
        setActiveTab("details")
      }
      return
    }

    setIsSubmitting(true)

    // Add 1000ms delay before proceeding with the update
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Create FormData object for the API request
      const apiFormData = new FormData()

      // Add basic fields
      Object.keys(formData).forEach((key) => {
        if (key !== "ingredients" && key !== "instructions") {
          apiFormData.append(key, formData[key])
        }
      })

      // Add arrays as JSON strings
      apiFormData.append("ingredients", JSON.stringify(formData.ingredients))
      apiFormData.append("instructions", JSON.stringify(formData.instructions))

      // Add(startsWith image if changed
      if (image) {
        apiFormData.append("images", image)
      }

      // Add videos if changed
      if (nepalVideo) {
        apiFormData.append("nepalVideo", nepalVideo)
      }

      if (hindiVideo) {
        apiFormData.append("hindiVideo", hindiVideo)
      }

      if (englishVideo) {
        apiFormData.append("englishVideo", englishVideo)
      }

      console.log("Submitting form data:", {
        id: recipe._id,
        name: formData.name,
        ingredients: formData.ingredients.length,
        instructions: formData.instructions.length,
        hasImage: !!image,
        hasNepalVideo: !!nepalVideo,
        hasHindiVideo: !!hindiVideo,
        hasEnglishVideo: !!englishVideo,
      })

      const result = await updateRecipe(recipe._id, apiFormData)

      if (result.success) {
        toast.success("Recipe updated successfully!")
        onClose()
      } else {
        toast.error(result.message || "Failed to update recipe")
      }
    } catch (error) {
      toast.error("Failed to update recipe.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!recipe) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="relative p-4 w-full max-w-5xl max-h-[100vh]">
        <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <span className="inline-block w-6 h-6 bg-orange-500 rounded-full mr-3"></span>
              Update Recipe
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
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

          {/* Form Content */}
          <div className="p-4 md:p-5 overflow-y-auto" style={{ maxHeight: "calc(90vh - 130px)" }}>
            {/* Basic Info Tab */}
            <div className={activeTab === "basic" ? "block" : "hidden"}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recipe Name */}
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Recipe Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full p-3 border ${formErrors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition`}
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    required
                  />
                  {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                </div>

                {/* Menu ID */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Menu ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`w-full p-3 border ${formErrors.menuId ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition`}
                    value={formData.menuId}
                    onChange={(e) => handleInputChange(e, "menuId")}
                    required
                  />
                  {formErrors.menuId && <p className="mt-1 text-sm text-red-500">{formErrors.menuId}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition bg-white"
                    value={formData.category}
                    onChange={(e) => handleInputChange(e, "category")}
                    required
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snacks">Snacks</option>
                  </select>
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className={`w-full p-3 border ${formErrors.description ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition`}
                    rows="4"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e, "description")}
                    required
                  ></textarea>
                  {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
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
                    <label className="block text-gray-700 font-medium mb-2">
                      Total Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full p-3 border ${formErrors.tot_time ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition`}
                      placeholder="e.g. 45 minutes"
                      value={formData.tot_time}
                      onChange={(e) => handleInputChange(e, "tot_time")}
                      required
                    />
                    {formErrors.tot_time && <p className="mt-1 text-sm text-red-500">{formErrors.tot_time}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Preparation Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full p-3 border ${formErrors.prep_time ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition`}
                      placeholder="e.g. 15 minutes"
                      value={formData.prep_time}
                      onChange={(e) => handleInputChange(e, "prep_time")}
                      required
                    />
                    {formErrors.prep_time && <p className="mt-1 text-sm text-red-500">{formErrors.prep_time}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Cooking Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full p-3 border ${formErrors.cook_time ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition`}
                      placeholder="e.g. 30 minutes"
                      value={formData.cook_time}
                      onChange={(e) => handleInputChange(e, "cook_time")}
                      required
                    />
                    {formErrors.cook_time && <p className="mt-1 text-sm text-red-500">{formErrors.cook_time}</p>}
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-orange-500" />
                  Ingredients <span className="text-red-500">*</span>
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

                <div
                  className={`bg-gray-50 rounded-lg p-3 min-h-32 border ${formErrors.ingredients ? "border-red-500" : "border-gray-200"}`}
                >
                  {formData.ingredients.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No ingredients added yet</p>
                  ) : (
                    <ul className="space-y-2">
                      {formData.ingredients.map((item, index) => (
                        <li key={index} className="flex items-center bg-white p-3 rounded-md shadow-sm">
                          <span className="w-6 h-6 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                            {index + 1}
                          </span>
                          <input
                            type="text"
                            className="flex-1 border-none focus:ring-0 p-0 bg-transparent"
                            value={item}
                            onChange={(e) => handleInputChange(e, "ingredients", index)}
                          />
                          <button
                            type="button"
                            className="text-red-500 hover:bg-red-50 p-1 rounded-full transition"
                            onClick={() => removeIngredient(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {formErrors.ingredients && <p className="mt-1 text-sm text-red-500">{formErrors.ingredients}</p>}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-orange-500" />
                  Instructions <span className="text-red-500">*</span>
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

                <div
                  className={`bg-gray-50 rounded-lg p-3 min-h-32 border ${formErrors.instructions ? "border-red-500" : "border-gray-200"}`}
                >
                  {formData.instructions.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No instructions added yet</p>
                  ) : (
                    <ul className="space-y-2">
                      {formData.instructions.map((item, index) => (
                        <li key={index} className="flex items-center bg-white p-3 rounded-md shadow-sm">
                          <span className="w-6 h-6 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                            {index + 1}
                          </span>
                          <input
                            type="text"
                            className="flex-1 border-none focus:ring-0 p-0 bg-transparent"
                            value={item}
                            onChange={(e) => handleInputChange(e, "instructions", index)}
                          />
                          <button
                            type="button"
                            className="text-red-500 hover:bg-red-50 p-1 rounded-full transition"
                            onClick={() => removeInstruction(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {formErrors.instructions && <p className="mt-1 text-sm text-red-500">{formErrors.instructions}</p>}
                </div>
              </div>
            </div>

            {/* Media Tab */}
            <div className={activeTab === "media" ? "block" : "hidden"}>
              {/* Image Upload */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-orange-500" />
                  Recipe Image
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div
                      onClick={handleImageClick}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
                    >
                      <input
                        type="file"
                        id="image-upload"
                        ref={imageInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-500">Click to upload a new image</p>
                      <p className="text-sm text-gray-400 mt-1">PNG, JPG or JPEG (max 5MB)</p>
                    </div>
                  </div>

                  <div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden aspect-video bg-gray-50">
                      {image ? (
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt="Recipe preview"
                          className="w-full h-full object-cover"
                        />
                      ) : recipe?.images?.[0]?.url ? (
                        <img
                          src={recipe.images[0].url || "/placeholder.svg"}
                          alt="Recipe"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="w-12 h-12 text-gray-300" />
                          <span className="ml-2 text-gray-400">No image available</span>
                        </div>
                      )}
                    </div>
                    {(image || recipe?.images?.[0]?.url) && (
                      <p className="text-sm text-gray-500 mt-2 text-center">Current image preview</p>
                    )}
                  </div>
                </div>
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
                          <span className="text-gray-500 truncate">
                            {nepalVideo ? nepalVideo.name : "Choose video file"}
                          </span>
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
                      ) : recipe?.nepalVideo?.[0]?.url ? (
                        <div className="border border-gray-300 rounded-lg overflow-hidden aspect-video bg-black">
                          <video src={recipe.nepalVideo[0].url} controls className="w-full h-full"></video>
                        </div>
                      ) : (
                        <div className="border border-gray-300 rounded-lg flex items-center justify-center aspect-video bg-gray-50">
                          <Video className="w-8 h-8 text-gray-300" />
                          <span className="ml-2 text-gray-400">No video available</span>
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
                          <span className="text-gray-500 truncate">
                            {hindiVideo ? hindiVideo.name : "Choose video file"}
                          </span>
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
                      ) : recipe?.hindiVideo?.[0]?.url ? (
                        <div className="border border-gray-300 rounded-lg overflow-hidden aspect-video bg-black">
                          <video src={recipe.hindiVideo[0].url} controls className="w-full h-full"></video>
                        </div>
                      ) : (
                        <div className="border border-gray-300 rounded-lg flex items-center justify-center aspect-video bg-gray-50">
                          <Video className="w-8 h-8 text-gray-300" />
                          <span className="ml-2 text-gray-400">No video available</span>
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
                          <span className="text-gray-500 truncate">
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
                      ) : recipe?.englishVideo?.[0]?.url ? (
                        <div className="border border-gray-300 rounded-lg overflow-hidden aspect-video bg-black">
                          <video src={recipe.englishVideo[0].url} controls className="w-full h-full"></video>
                        </div>
                      ) : (
                        <div className="border border-gray-300 rounded-lg flex items-center justify-center aspect-video bg-gray-50">
                          <Video className="w-8 h-8 text-gray-300" />
                          <span className="ml-2 text-gray-400">No video available</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 md:p-5 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdateRecipe}
              className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                 <Loader className="animate-spin w-4 h-4 mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateRecipe
