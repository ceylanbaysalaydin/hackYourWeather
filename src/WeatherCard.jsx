import React from 'react';
import { Link } from 'react-router-dom';

function WeatherCard({ cityWeather, closeWeatherCard }) {
  const {
    id,
    name,
    sys: { country },
    weather,
    main: { temp_min, temp_max },
    coord: { lon, lat },
  } = cityWeather;
  const { main, description } = weather[0];
  console.log(id);
  return (
    <div>
      <div className="card">
        <div
          className="close"
          onClick={() => {
            closeWeatherCard(id);
          }}
        >
          <i className="far fa-times-circle fa-2x"></i>
        </div>
        <h4>
          <Link to={'/' + id}>
            {name}, {country}
          </Link>
        </h4>
        <h6> {main} </h6>
        <p> {description} </p>
        <p> min temp: {temp_min} </p>
        <p> max temp: {temp_max} </p>
        <p>
          location: {lon}, {lat}
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;
