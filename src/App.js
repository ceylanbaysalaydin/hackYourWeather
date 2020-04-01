import React from 'react';
import './App.css';
import WeatherCard from './WeatherCard';
import cityWeather from './city-weather.json';

function App() {
  return (
    <div className="App">
      <h1> Weather </h1>
      {cityWeather.map(cityObject => (
        <WeatherCard
          key={cityObject.id}
          cityName={cityObject.name}
          countryName={cityObject.sys.country}
          main={cityObject.weather[0].main}
          description={cityObject.weather[0].description}
          temp_min={cityObject.main.temp_min}
          temp_max={cityObject.main.temp_max}
          lon={cityObject.coord.lon}
          lat={cityObject.coord.lat}
        />
      ))}
    </div>
  );
}

export default App;
