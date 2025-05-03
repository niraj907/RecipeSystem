import React from "react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return (
      <div className="rounded-xl shadow-lg p-8 my-10 lg:my-[5rem] text-center bg-white max-w-[38rem]">
        <div>
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-900">
            Start Exploring Videos
          </h3>
          <p className="mt-2 text-gray-500">
            Enter a search term above to discover amazing YouTube content
          </p>
        </div>
      </div>
    );
  }

  // Extract video ID from API response or thumbnail URL
  const getVideoId = () => {
    if (video.id?.videoId) return video.id.videoId;
    try {
      return video.snippet.thumbnails.default.uri.split("/")[4];
    } catch {
      return "invalid-video-id";
    }
  };

  const videoSrc = `https://www.youtube.com/embed/${getVideoId()}`;

  return (
    <div className="bg-white my-[4.1rem] rounded-xl shadow-lg overflow-hidden max-w-[80rem] p-8 ">
      <div className="aspect-video bg-gray-900">
        <iframe
          src={videoSrc}
          allowFullScreen
          title="Video player"
          className="w-full h-full"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {video.snippet.title}
        </h2>
        
        <div className="flex items-center gap-4 mb-4">
          <p className="text-gray-600 font-medium">
            {video.snippet.channelTitle}
          </p>
          <span className="text-gray-400 text-sm">
            {new Date(video.snippet.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <div className="prose max-w-none text-gray-700 mb-4">
          {video.snippet.description}
        </div>

      </div>
    </div>
  );
};

export default VideoDetail;