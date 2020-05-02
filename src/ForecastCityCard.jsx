import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useParams, Link } from 'react-router-dom';

export default function ForecastCityCard() {
  const [city, setCity] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const { cityId } = useParams();

  const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  const getForecastData = async () => {
    try {
      const URL = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&appid=${API_KEY} `;
      setLoading(true);
      const response = await fetch(URL);
      if (response.ok) {
        const data = await response.json();
        setForecastData(data.list);
        setCity(data.city);
      } else {
        throw Error('Something went wrong...');
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getForecastData();
  }, [cityId]);

  return (
    <div>
      <h1> 5 day Forecast </h1>
      {city && (
        <h2>
          {city.name}, {city.country}
        </h2>
      )}
      {hasError && <p> Something went wrong!.. </p>}
      {isLoading && <p> Loading... </p>}
      {forecastData && (
        <AreaChart
          width={700}
          height={500}
          data={forecastData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dt_txt" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" name="temp" dataKey="main.temp" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      )}
      <h3>
        <Link to="/"> Go Back!</Link>{' '}
      </h3>
    </div>
  );
}
