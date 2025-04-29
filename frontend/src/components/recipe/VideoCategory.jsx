// import React, { useState } from "react";
// import { Button } from "../ui/button";

// const VideoCategory = ({ recipe }) => {
//   const nepaliVideo = recipe.nepaliVideo || "";
//   const hindiVideo = recipe.nepaliVideo || "";
//   const englishVideo = recipe.nepaliVideo || "";


//   const videos = {
//     nepali: { nepaliVideo },
//     hindi: {hindiVideo },
//     english: {englishVideo },
//     all: [
//       { nepaliVideo },
//       { hindiVideo },
//       { englishVideo },
//     ].filter((video) => video), 
//   };

//   const [selectedCategory, setSelectedCategory] = useState("nepali");
//   const [selectedVideo, setSelectedVideo] = useState(videos.nepali);

//   const changeVideo = (category) => {
//     const lowerCategory = category.toLowerCase();
//     setSelectedCategory(lowerCategory);
//     setSelectedVideo(lowerCategory === "all" ? videos.all : videos[lowerCategory] );
//   };

//   const getVideo = () => {

//   };

//   return (
//     <div className="w-full px-4 py-8">
//       {/* Buttons */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//         {["Nepali", "Hindi", "English", "All"].map((category) => (
//           <Button
//             key={category}
//             className={`rounded-md transition-all duration-300 text-[1.2rem] ${
//               selectedCategory === category.toLowerCase()
//                 ? "bg-orange-500 text-white hover:bg-orange-600 focus:outline-none"
//                 : "bg-white text-[#F67A24] hover:bg-white hover:text-[#F67A24] ring-2 ring-[#F67A24]"
//             }`}
//             onClick={() => changeVideo(category)}
//           >
//             {category}
//           </Button>
//         ))}
//       </div>

//       {/* Video Display */}
//       <div className="w-full">
//         {Array.isArray(selectedVideo) ? (
//           // Show all videos in a grid
        
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {selectedVideo.map((video, index) => {
             
//                 return videoId ? (
//                   <div key={index} className="w-full">
//                     {/* Video container */}
//                     <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                     
//                     </div>
                  
//                   </div>
//                 ) : (
//                   <p key={index} className="text-center text-red-500">Invalid Video</p>
//                 );
//               })}
//             </div>
         
//         ) : (
//           (() => {
//             const videoId = getVideo(selectedVideo);
//             return videoId ? (
//               <div className="w-full">
//                 <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>

//                 </div>

//               </div>
//             ) : (
//               <p className="text-center text-red-500">Invalid Video</p>
//             );
//           })()
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoCategory;



import React, { useState } from "react";
import { Button } from "../ui/button";

const VideoCategory = ({ recipe }) => {
  // Correctly access video arrays from recipe
  const nepaliVideo = recipe.nepalVideo?.[0]?.url || "";
  const hindiVideo = recipe.hindVideo?.[0]?.url || "";
  const englishVideo = recipe.englishVideo?.[0]?.url || "";

  const videos = {
    nepali: nepaliVideo,
    hindi: hindiVideo,
    english: englishVideo,
    all: [nepaliVideo, hindiVideo, englishVideo].filter(url => url),
  };

  const [selectedCategory, setSelectedCategory] = useState("nepali");
  const [selectedVideo, setSelectedVideo] = useState(videos.nepali);

  const changeVideo = (category) => {
    const lowerCategory = category.toLowerCase();
    setSelectedCategory(lowerCategory);
    setSelectedVideo(videos[lowerCategory]);
  };

  return (
    <div className="w-full px-4 py-8">
      {/* Category Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {["Nepali", "Hindi", "English", "All"].map((category) => (
          <Button
            key={category}
            className={`rounded-md transition-all duration-300 text-[1.2rem] ${
              selectedCategory === category.toLowerCase()
                ? "bg-orange-500 text-white hover:bg-orange-600 focus:outline-none"
                : "bg-white text-[#F67A24] hover:bg-white hover:text-[#F67A24] ring-2 ring-[#F67A24]"
            }`}
            onClick={() => changeVideo(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Video Display */}
      <div className="w-full">
        {selectedCategory === "all" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videos.all.map((url, index) => (
              <div key={index} className="w-full">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <video 
                    controls 
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                  >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {selectedVideo ? (
              <video
                controls
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              >
                <source src={selectedVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="absolute top-0 left-0 w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No video available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCategory;