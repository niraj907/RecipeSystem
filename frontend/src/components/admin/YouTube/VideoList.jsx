import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ videos, handleVideoSelect }) => {
    return (
        <div className="divide-y divide-gray-200">
            {videos.map((video) => (
                <VideoItem 
                    key={video.id.videoId} 
                    video={video} 
                    handleVideoSelect={handleVideoSelect} 
                />
            ))}
        </div>
    );
};

export default VideoList;