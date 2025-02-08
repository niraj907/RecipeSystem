import React, { useState } from "react";

const nepaliVideo = "https://www.youtube.com/embed/0Yo2gE4xbKk";
const hindiVideo = "https://www.youtube.com/embed/OdrOp7JwZiE";
const englishVideo = "https://www.youtube.com/embed/2Vv-BfVoq4g";

const videos = {
  nepali: nepaliVideo,
  hindi: hindiVideo,
  english: englishVideo,
  all: [nepaliVideo, hindiVideo, englishVideo], // Store all videos as an array
};

const VideoCategory = () => {
  const [selectedVideo, setSelectedVideo] = useState(nepaliVideo);

  const changeVideo = (category) => {
    if (category === "All") {
      setSelectedVideo(videos.all);
    } else {
      setSelectedVideo(videos[category.toLowerCase()]);
    }
  };

  return (
    <div className="w-full px-4 py-8">
      {/* Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {["Nepali", "Hindi", "English", "All"].map((category) => (
          <button
            key={category}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none"
            onClick={() => changeVideo(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Display */}
      <div className="w-full">
        {Array.isArray(selectedVideo) ? (
          // Show all videos in a grid
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedVideo.map((video, index) => (
              <div key={index} className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={video}
                  title={`YouTube Video ${index + 1}`}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        ) : (
          // Show single video
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={selectedVideo}
              title="YouTube Video"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCategory;
