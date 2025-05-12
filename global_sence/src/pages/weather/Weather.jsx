import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Weather.css';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastdata] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showFullInstr, setShowFullInstr] = useState(false);


  const APIKEY = '33859b42938f41308af85015250205';
  const current_url = 'http://api.weatherapi.com/v1/current.json?key=' + APIKEY + '&q=London&aqi=no';
  const forecast_url = 'http://api.weatherapi.com/v1/forecast.json?key=' + APIKEY + '&q=London&days=7&aqi=no&alerts=yes';
  const alert_url = 'http://api.weatherapi.com/v1/alerts.json?key=' + APIKEY + '&q=London';
  useEffect(() => {
    fetch(current_url)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
        alert("Failed to load weather data");
      });
  }, []);

  useEffect(() => {
    fetch(forecast_url)
      .then((res) => res.json())
      .then((data) => {
        setForecastdata(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching forecast data:", err);
        alert("Failed to load forecast data");
      });
  }, []);

  useEffect(() => {
    fetch(alert_url)
      .then((res) => res.json())
      .then((data) => {
        setAlertData(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching alert data:", err);
        alert("Failed to load alert data");
      });
  }, []);



  const saveWeatherToDB = async () => {
    if (!weatherData || !forecastData) {
      alert("Weather or forecast data not available to save.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/save-weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current: weatherData, forecast: forecastData }),
      });

      const data = await response.json();
      console.log(data);
      alert(data.message);
    } catch (err) {
      console.error("Error saving weather data:", err);
      alert('Failed to save weather data');
    }

  };

  const getImportantAlerts = () => {
    if (!alertData?.alerts?.alert) return null;
    const alerts = alertData.alerts.alert.filter(alert => alert.severity === "Moderate" || alert.severity === "Severe");
    return alerts.length > 0 ? alerts[0] : null;
  };

  const importantAlert = getImportantAlerts();

  // toggle day selection
  const handleDayClick = (index) => {
    if (selectedDayIndex === index) {
      setSelectedDayIndex(null); // collapse if same day clicked again
    } else {
      setSelectedDayIndex(index);
    }
  };

  //to limit the length of the text 
  const truncateText = (text, limit) => {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + '…' : text;
  };

  return (
    <div className="container-fluid weather-container">
      <h2 className="text-center mb-4">Weather Forecast for {weatherData?.location?.name}, {weatherData?.location?.country}</h2>

      {/* display current weather */}
      {weatherData ? (
        <div className="row">
          <div className="col-md-3 mt-4">
            <div className="card shadow-lg ">
              <div className="card-body text-center current-weather">
                <img src={weatherData.current?.condition.icon} alt="Weather Icon" className="mb-3" />
                <h3>{weatherData.current?.temp_c}°C</h3>
                <p className="condition-text">{weatherData.current?.condition.text}</p>
                <p><strong>Humidity:</strong> {weatherData.current?.humidity}%</p>
                <p><strong>Wind:</strong> {weatherData.current?.wind_kph} kph</p>
              </div>
            </div>
            <button className="save-btn mt-3" onClick={saveWeatherToDB}>
              Save Weather
            </button>
          </div>

          {/* display weather alert if have */}
          <div className="col-md-9">
            {importantAlert && (
              <div className="alert alert-danger d-flex p-4 rounded-3 shadow-sm custom-alert-box">
                <div className="me-3 fs-1 text-danger" style={{ lineHeight: '1' }}>&#9888;</div>
                <div className="flex-grow-1">
                  <h4 className="alert-heading fw-bold mb-3">Important Weather Alert</h4>

                  <p className="mb-1"><strong>Event:</strong> {importantAlert.event}</p>
                  <p className="mb-1"><strong>Severity:</strong> {importantAlert.severity}</p>
                  <p className="mb-3"><strong>Areas Affected:</strong> {importantAlert.areas}</p>


                  <h6 className="fw-bold mt-3">Description</h6>
                  <p className="small text-muted">
                    {showFullDesc ? importantAlert.desc : truncateText(importantAlert.desc, 200)}
                    {importantAlert.desc.length > 200 && (
                      <button
                        className="btn btn-link btn-sm p-0 ms-1"
                        onClick={() => setShowFullDesc(!showFullDesc)}
                      >
                        {showFullDesc ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </p>

                  <h6 className="fw-bold mt-3">Recommended Actions</h6>
                  <p className="small text-muted">
                    {showFullInstr ? importantAlert.instruction : truncateText(importantAlert.instruction, 200)}
                    {importantAlert.instruction.length > 200 && (
                      <button
                        className="btn btn-link btn-sm p-0 ms-1"
                        onClick={() => setShowFullInstr(!showFullInstr)}
                      >
                        {showFullInstr ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </p>

                  {/* if the decscription of the importance alert have the text of metoffice.gov.uk the show the information */}
                  {importantAlert.desc?.includes('metoffice.gov.uk') && (
                    <p className="small mt-3">
                      For more information, see the <a href="https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-warnings" target="_blank" rel="noopener noreferrer">official Met Office warnings</a>.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* display the forecast of 7 days */}
            <div className="card mt-4 mb-4 forecast-section">
              <div className="card-body">
                <h5 className="card-title mb-4">7-Day Forecast</h5>
                <div className="row">
                  {forecastData?.forecast?.forecastday?.length > 0 ? (
                    forecastData.forecast.forecastday.map((day, index) => (
                      <div key={index} className="col-6 col-md-6 col-lg-4 mb-3">
                        <div className={`card ${selectedDayIndex === index ? 'border-primary' : ''}`} onClick={() => handleDayClick(index)} style={{ cursor: 'pointer' }}>
                          <div className="card-body forecast-card">
                            <h6>{day.date}</h6>
                            <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
                            <p><strong>{day.day.condition.text}</strong></p>
                            <p><strong>Max:</strong> {day.day.maxtemp_c}°C</p>
                            <p><strong>Min:</strong> {day.day.mintemp_c}°C</p>

                            {selectedDayIndex === index && (
                              <div className="mt-3 text-start hourly-forecast">
                                <h6>Hourly Forecast</h6>
                                {day.hour.slice(0, 24).map((hour, hourIndex) => (
                                  <div key={hourIndex} className="mb-2 p-2 border rounded bg-light">
                                    <p><strong>{hour.time.split(' ')[1]}</strong></p>
                                    <p>Temp: {hour.temp_c}°C</p>
                                    <p>Feels Like: {hour.feelslike_c}°C</p>
                                    <p>Precip: {hour.precip_mm} mm</p>
                                    <p>Wind: {hour.wind_mph} mph</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No forecast data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Weather;
