import React from 'react';
import SearchBar from "../YouTube/SearchBar"
import youtube from "../YouTube/youtube";
import VideoDetail from '../YouTube/VideoDetail';
import VideoList from '../YouTube/VideoList';


class MainYoutube extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
        isLoading: false,
        error: null
    }

    handleSubmit = async (termFromSearchBar) => {
        this.setState({ isLoading: true, error: null });
        try {
            const response = await youtube.get('/search', {
                params: { q: termFromSearchBar }
            });

            this.setState({
                videos: response.data.items,
                selectedVideo: response.data.items[0],
                isLoading: false
            });
        } catch (error) {
            this.setState({
                error: "Failed to fetch videos. Please try again.",
                isLoading: false
            });
            console.error("API Error:", error);
        }
    };

    handleVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    render() {
        const { videos, selectedVideo, isLoading, error } = this.state;

        return (
            <div className="w-[68.6rem] mx-[15.8rem] bg-gray-100 py-[5rem]">
                <SearchBar handleFormSubmit={this.handleSubmit} />
                
                <div className="px-4 sm:px-6 lg:px-8 py-8 my-[10rem">
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="text-center py-12 my-[10rem]">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Searching videos...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Main Video Section */}
                            <div className="lg:w-2/3">
                                <VideoDetail video={selectedVideo} />
                            </div>

                            {/* Video List */}
                            <div className="lg:w-1/3 my-[4.1rem]">
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="p-4 bg-red-600">
                                        <h2 className="text-white text-lg font-semibold">
                                            Search Results
                                        </h2>
                                    </div>
                                    <VideoList 
                                        handleVideoSelect={this.handleVideoSelect} 
                                        videos={videos}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default MainYoutube;