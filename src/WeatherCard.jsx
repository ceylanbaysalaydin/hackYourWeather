import React from 'react';

function WeatherCard({ cityWeather }) {
  if (cityWeather.cod !== 200) {
    return <p style={{ marginTop: '50px' }}> Please enter a valid city name! </p>;
  } else {
    console.log(cityWeather);
    const {
      name,
      sys: { country },
      weather,
      main: { temp_min, temp_max },
      coord: { lon, lat },
    } = cityWeather;
    const { main, description } = weather[0];
    return (
      <div>
        <div className="card">
          <h4>
            {name}, {country}
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
}

export default WeatherCard;
