import React, { useState } from "react";
import { Button } from "../ui/button";

const VideoCategory = ({ recipe }) => {
  const nepaliVideo = recipe.nepal || "";
  const hindiVideo = recipe.hindi || "";
  const englishVideo = recipe.english || "";

  const videos = {
    nepali: nepaliVideo,
    hindi: hindiVideo,
    english: englishVideo,
    all: [nepaliVideo, hindiVideo, englishVideo].filter(Boolean), // Remove empty values
  };

  const [selectedCategory, setSelectedCategory] = useState("nepali");
  const [selectedVideo, setSelectedVideo] = useState(videos.nepali);

  const changeVideo = (category) => {
    setSelectedCategory(category.toLowerCase());
    setSelectedVideo(category === "All" ? videos.all : videos[category.toLowerCase()] || "");
  };

  const getVideoIdFromUrl = (url) => {
    const regex =
      /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)?|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="w-full px-4 py-8">
      {/* Buttons */}
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
        {Array.isArray(selectedVideo) ? (
          // Show all videos in a grid
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedVideo.map((video, index) => {
              const videoId = getVideoIdFromUrl(video);
              return videoId ? (
                <div key={index} className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`YouTube Video ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p key={index} className="text-center text-red-500">
                  Invalid YouTube URL
                </p>
              );
            })}
          </div>
        ) : (
          (() => {
            const videoId = getVideoIdFromUrl(selectedVideo);
            return videoId ? (
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube Video"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="text-center text-red-500">Invalid YouTube URL</p>
            );
          })()
        )}
      </div>
    </div>
  );
};

export default VideoCategory;
