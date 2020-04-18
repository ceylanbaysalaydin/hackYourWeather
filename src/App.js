import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './WeatherCard';
import Form from './Form';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  const [cityWeather, setCityWeather] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${API_KEY}`;

  const getCityWeather = () => {
    if (inputValue !== '') {
      setLoading(true);
      fetch(URL)
        .then((res) => {
          if (res.status !== 500) {
            return res.json();
          } else {
            throw Error('Something went wrong...');
          }
        })
        .then((data) => setCityWeather(data))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  };

  const onSubmit = (e) => {
    setSearchCount(searchCount + 1);
    e.preventDefault();
  };
  const isCityWeatherReady = Object.keys(cityWeather).length !== 0;
  useEffect(getCityWeather, [searchCount]);

  return (
    <div className="App">
      <h1> Weather </h1>
      <Form inputValue={inputValue} setInputValue={setInputValue} onSubmit={onSubmit} />
      {isLoading && <p> Loading... </p>}
      {hasError && <p> Something went wrong! </p>}
      {isCityWeatherReady && (
        <div>
          <WeatherCard cityWeather={cityWeather} />
        </div>
      )}
    </div>
  );
}

export default App;
