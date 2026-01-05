const WeatherData = ({ capital, weather }) => {
  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {(weather.temp - 32) * (5 / 9)} Celsius</p>
      <p>Wind: {weather.windspeed} m/s</p>
      <p>Description: {weather.conditions}</p>
    </>
  );
};

export default WeatherData;
