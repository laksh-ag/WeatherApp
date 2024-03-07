import React, { useEffect, useState } from 'react';
import './TabContent.css';

const TabContent = ({ city }) => {
  const [next4Hours, setTemperature] = useState([]);
  const [next5Days, setTemperatureDays] = useState([]);
  const API_KEY = '78a07164952e030a671b9350f648cd70';
  const keys = {
    "Rio De Janerio": [28,30],
    "Beijing":[26,28],
    "Los Angeles":[33,35],
  }
  const lat = keys[city][0];
  const lon = keys[city][1];
  const office = 'OKX'
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const API_URL = `https://api.weather.gov/gridpoints/${office}/${lat},${lon}/forecast`;

  useEffect(() => {
    debugger;
    const fetchTemperatureData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch temperature data');
        }
        const data = await response.json();
        const foreCast = data.properties.periods.slice(0, 4);
        const foreCastDays = data.properties.periods.slice(4).filter((_, index) => index % 2 !== 0);;
        setTemperature(foreCast);
        setTemperatureDays(foreCastDays);
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };

    fetchTemperatureData();
  }, [city, API_URL]);

  return (
    <div className="tab-content">
      <h2 className='weather-forecast'>Weather Forecast</h2>
      {next4Hours ? (
        <div className="hourly-forecast-container">
        {next4Hours.map((hourlyData, index) => (
            <div className="weather-info">
            <div className="weather-details">
              <p>Time: {new Date(hourlyData.startTime).getUTCMonth()}/{new Date(hourlyData.startTime).getUTCDate()}/{new Date(hourlyData.startTime).getUTCFullYear()}</p>   
              <p>{new Date(hourlyData.startTime).getUTCHours()}.00 Hrs</p>
              {hourlyData.detailedForecast.includes('Cloudy') ? <img
                src={`https://openweathermap.org/img/wn/09d@2x.png`}
                alt="Weather Icon"
              /> : <img
              src={`https://openweathermap.org/img/wn/01d@2x.png`}
              alt="Weather Icon"
            />}
              <p>Temperature: {hourlyData.temperature} F</p>
              <p>Wind Speed:  {hourlyData.windSpeed} m/s</p>
            </div>
          </div>
        ))};       
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="Days-forecast-container">
      <h2 className='weather-forecast'>Weather  by Days</h2>
        {next5Days.map((hourlyData, index) => (
            <div className="weather-info-days">
            <div className="weather-details-days">
            {hourlyData.detailedForecast.includes('Cloudy') ? <img
                src={`https://openweathermap.org/img/wn/09d@2x.png`}
                alt="Weather Icon"
              /> : <img
              src={`https://openweathermap.org/img/wn/01d@2x.png`}
              alt="Weather Icon"
            />}
            <div className="weather-report">
                <div className="weather-report">
                    <p>{daysOfWeek[new Date(hourlyData.startTime).getUTCDay()]}, {months[new Date(hourlyData.startTime).getUTCMonth()]} {new Date(hourlyData.startTime).getUTCDate()}<br/>
                    {hourlyData.detailedForecast}</p> 
                </div>
            </div>
              
            </div>
          </div>
        ))}
        </div>
          
    </div>
  );
};

export default TabContent;