import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/weather';

export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(`${API_URL}/${city}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};
