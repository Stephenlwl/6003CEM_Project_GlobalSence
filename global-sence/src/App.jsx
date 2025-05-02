import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  
  // allow to use async/await in useEffect for fetching the weather api data
  useEffect(() => {
    const APIKEY = '33859b42938f41308af85015250205';
    const url = 'http://api.weatherapi.com/v1/current.json?key=' + APIKEY + '&q=Malaysia&aqi=no';
    const options = {
      method: 'GET'
    };

    const fetchWeather = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setWeather(result);
      } catch (error) {
        console.error(error);
        setWeatherError(error);
      }
    };

    fetchWeather();
  }, []);


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="weather">
        <h2>The Weather in Malaysia</h2>
        {weather ? (
          <div>
            <img src={weather.current?.condition.icon} alt="Weather Icon" />
            <p><strong>Location:</strong> {weather.location?.name}, {weather.location?.country}</p>
            <p><strong>Temperature:</strong> {weather.current?.temp_c} °C</p>
            <p><strong>Weather Description:</strong> {weather.current?.condition.text}</p>
            <p><strong>Humidity:</strong> {weather.current?.humidity} %</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
      
    </>
  )
}

export default App
