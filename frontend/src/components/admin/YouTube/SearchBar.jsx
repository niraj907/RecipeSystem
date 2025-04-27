import React from 'react';
import { FaYoutube, FaSearch, FaTimes } from 'react-icons/fa';
import { toast } from "sonner";

class SearchBar extends React.Component {
    state = { term: '' };

    handleChange = (event) => {
        this.setState({ term: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.term.trim() === '') {
            toast.error("Please fill the search field to get the video");
            return;
        }
        this.props.handleFormSubmit(this.state.term);
    };

    clearSearch = () => {
        this.setState({ term: '' });
    };

    render() {
        return (
            <div className="bg-red-600 px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <FaYoutube className="text-white text-4xl" />
                        <h1 className="text-white text-2xl font-bold hidden sm:block">
                            YouTube Clone
                        </h1>
                    </div>
                    
                    <form onSubmit={this.handleSubmit} className="flex-1 max-w-2xl">
                        <div className="relative">
                            <input
                                onChange={this.handleChange}
                                value={this.state.term}
                                type="text"
                                placeholder="Search videos..."
                                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <div className="absolute right-3 top-3 flex space-x-2">
                                {this.state.term && (
                                    <button
                                        type="button"
                                        onClick={this.clearSearch}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <FaTimes className="text-xl" />
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <FaSearch className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchBar;