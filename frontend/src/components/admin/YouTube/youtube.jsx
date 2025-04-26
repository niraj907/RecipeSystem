import axios from 'axios';

const KEY = "AIzaSyAX_mD8VtyX11flYpyh-mYUHM31bfke5k4"; // Removed leading space

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY 
    }
});