import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherApp.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      if (city) {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_OPENWEATHERMAP_API_KEY`
          );
          setWeather(response.data);
          setError(null);
          const forecastResponse = await axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=YOUR_OPENWEATHERMAP_API_KEY`
          );
          setForecast(forecastResponse.data.list);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWeather();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="weather-app">
      <header>
        <h1>Weather App</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading ? (
        <div className="loading-indicator">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="weather-data">
          {weather && (
            <div className="current-weather">
              <h2>Current Weather in {weather.name}</h2>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <p>Weather Description: {weather.weather[0].description}</p>
            </div>
          )}
          {forecast && (
            <div className="forecast">
              <h2>5-Day Forecast</h2>
              {forecast.slice(0, 5).map((day, index) => (
                <div key={index} className="forecast-day">
                  <p>Day {index + 1}</p>
                  <p>High: {day.main.temp_max}°C</p>
                  <p>Low: {day.main.temp_min}°C</p>
                  <p>Weather Description: {day.weather[0].description}</p>
                </div>
              ))}
            </div>
          )}
          {error && (
            <div className="error-message">
              <p style={{ color: 'red' }}>{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;