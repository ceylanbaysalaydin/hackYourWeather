import React from 'react';

function WeatherCard(props) {
  const { cityName, countryName, main, description, temp_min, temp_max, lon, lat } = props;
  return (
    <div>
      <div className="card">
        <h4>
          {cityName}, {countryName}
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
