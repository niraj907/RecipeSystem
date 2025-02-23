import React, { useState, useEffect } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";


const UploaderRecipe = ({ onFilesSelected, images }) => {
const [files, setFiles] = useState([]);
//console.log("UploaderRecipe Image:",images);

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
    onFilesSelected(uploadedFiles); // Pass files to parent
  };
  

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    onFilesSelected(droppedFiles); // Pass files to parent
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles); // Update parent with new file list
  };


  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    setFiles(images)
  }, [images]);

  return (
    <main className="flex flex-col items-center justify-center">
      <div
        className="border-2 border-dashed border-[#F67A24] rounded-lg p-4 w-full sm:w-[20rem] md:w-[42rem] lg:w-[45rem] h-auto flex flex-col items-center justify-center relative bg-white"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <MdCloudUpload className="text-4xl sm:text-5xl text-[#F67A24]" />
        <p className="mt-2 text-gray-600 text-center text-sm sm:text-base">
          Drag and drop your image file here
        </p>
        <p className="text-gray-500 text-center text-xs sm:text-sm">or</p>
        <label
          htmlFor="fileInput"
          className="mt-2 px-3 sm:px-4 py-1 sm:py-2 bg-[#F67A24] text-white rounded cursor-pointer hover:bg-[#f67b24de] text-sm sm:text-base"
        >
          Browse Files
        </label>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Fixing the conditional check */}
    
   {files!== null && 
  files
?.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {files.map((file, index) => {
            const previewURL = URL.createObjectURL(file);

            return (
              <div
                key={index}
                className="relative w-32 h-32 border border-gray-300 rounded overflow-hidden"
              >
                {file.type.startsWith("image/") ? (
                  <img
                    src={previewURL}
                    alt="Preview"
                    className="w-full h-full object-cover bg-black"
                  />
                ) : (
                  <AiFillFileImage className="w-full h-full text-gray-300" />
                )}
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => removeFile(index)}
                >
                  <MdDelete />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default UploaderRecipe;
