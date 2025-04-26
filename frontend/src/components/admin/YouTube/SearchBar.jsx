import React from 'react';
import { FaYoutube, FaSearch } from 'react-icons/fa';

class SearchBar extends React.Component {
    state = { term: '' };

    handleChange = (event) => {
        this.setState({ term: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state.term);
    }
    render() {
        return (
 <div className="bg-red-600 px-4 py-4 sm:pl-[8rem] md:pl-[12rem] lg:pl-[18rem] pt-[5.5rem] lg:pt-[6rem] max-w-[83rem] mx-auto">
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
                                <button
                                    type="submit"
                                    className="absolute right-3 top-3 text-red-600 hover:text-red-700"
                                >
                                    <FaSearch className="text-xl" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            
        );
    }
}

export default SearchBar;