import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import WeatherCard from './WeatherCard';
import Form from './Form';
import ForecastCityCard from './ForecastCityCard';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  // const [cityWeather, setCityWeather] = useState({});
  const [cityWeatherCards, setCityWeatherCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  const onSubmit = (e) => {
    setSearchCount(searchCount + 1);
    e.preventDefault();
  };

  const closeWeatherCard = (id) => {
    setCityWeatherCards((currentList) => {
      currentList = currentList.filter((card) => card.id !== id);
      return currentList;
    });
  };
  const isCityWeatherCardsReady = cityWeatherCards.length !== 0;
  useEffect(() => {
    const getCityWeather = async () => {
      try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${API_KEY}`;
        setLoading(true);
        setError(false);
        const response = await fetch(URL);
        if (response.ok) {
          console.log(response);
          const data = await response.json();
          setCityWeatherCards((currentList) => [data, ...currentList]);
        } else {
          throw Error('Something went wrong...');
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (inputValue !== '') {
      getCityWeather();
    }
  }, [searchCount]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <h1> Weather </h1>
            <Form inputValue={inputValue} setInputValue={setInputValue} onSubmit={onSubmit} />
            {isLoading && <p> Loading... </p>}
            {hasError && <p className="errorMessage"> Please enter a valid city name! </p>}
            {isCityWeatherCardsReady &&
              cityWeatherCards.map((item) => (
                <div key={item.id}>
                  <WeatherCard cityWeather={item} closeWeatherCard={closeWeatherCard} />
                </div>
              ))}
          </div>
        </Route>
        <Route path="/:cityId">
          <ForecastCityCard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
