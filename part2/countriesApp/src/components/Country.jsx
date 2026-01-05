import WeatherData from "./Weather";

const CountrySearcher = ({ value, handleChange }) => {
  return (
    <div>
      find countries <input value={value} onChange={handleChange} />
    </div>
  );
};

const CountryData = ({ country, weather }) => {
  if (country === null || weather === null) return;
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map((key) => {
          return <li key={key}>{country.languages[key]}</li>;
        })}
      </ul>
      <img alt={country.flags.alt} src={country.flags.png} />
      <WeatherData capital={country.capital[0]} weather={weather} />
    </>
  );
};

const CountryList = ({ countries, handleShowSingleCountry }) => {
  if (countries.length === 0) return;
  return (
    <>
      {countries.map((country) => (
        <p key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => handleShowSingleCountry(country)}>Show</button>
        </p>
      ))}
    </>
  );
};

export default { CountryData, CountryList, CountrySearcher };
