import React from 'react';

const VideoItem = ({ video, handleVideoSelect }) => {
  return (
    <div
      onClick={() => handleVideoSelect(video)}
      className="group flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="flex-shrink-0 relative">
        <img
          className="w-40 h-24 object-cover rounded-lg"
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          5:30
        </div>
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
          {video.snippet.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {video.snippet.channelTitle}
        </p>
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <span>235K views</span>
          <span className="mx-1">•</span>
          <span>2 days ago</span>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;