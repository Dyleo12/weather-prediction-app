import React, { useState } from 'react';
import { fetchWeather } from './weatherService';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleFetchWeather = async () => {
        try {
            const data = await fetchWeather(city);
            setWeatherData(data);
            setError(null);
        } catch (err) {
            setError('Could not fetch weather data. Please check the city name.');
            setWeatherData(null);
        }
    };

    return (
        <div className="container">
            <h1>Weather Prediction App</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleFetchWeather}>Get Tomorrow's Weather</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weatherData && (
                <div className="weather-box">
                    <h2>Tomorrow's Prediction</h2>
                    <div className="weather-info">
                        <p>Temperature: {weatherData.tomorrow.temperature}°C</p>
                        <p>Description: {weatherData.tomorrow.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
