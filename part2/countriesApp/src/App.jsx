import { useState, useEffect } from "react";
import countriesData from "./CountriesData";
import Country from "./components/Country";
import getWeather from "./services/Weather";

function App() {
  const [searchedCountry, setSearchedCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState(null);
  const [countryWeather, setCountryWeather] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    countriesData.loadCountriesData().then((data) => setAllCountries(data));
    if (searchedCountry) {
      const countryResult = allCountries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(searchedCountry.toLowerCase())
      );
      if (countryResult.length === 1) {
        setSingleCountry(countryResult[0]);
        getWeather(countryResult[0].capital[0]).then((weather) => {
          setCountryWeather(weather);
        });
        setFilteredCountries([]);
        setMessage("");
      } else if (countryResult.length >= 2 && countryResult.length <= 10) {
        setFilteredCountries(countryResult);
        setSingleCountry(null);
        setCountryWeather(null);
        setMessage("");
      } else {
        setSingleCountry(null);
        setCountryWeather(null);
        setFilteredCountries([]);
        countryResult.length > 10
          ? setMessage("Too many matches, specify another filter")
          : setMessage("No countries found");
      }
    }
  }, [searchedCountry]);

  const showSingleCountry = (country) => {
    setSingleCountry(country);
    getWeather(country.capital[0]).then((weather) =>
      setCountryWeather(weather)
    );
    setFilteredCountries([]);
    setSearchedCountry("");
  };

  return (
    <>
      <Country.CountrySearcher
        value={searchedCountry}
        handleChange={(event) => setSearchedCountry(event.target.value)}
      />
      <Country.CountryData country={singleCountry} weather={countryWeather} />
      <Country.CountryList
        countries={filteredCountries}
        handleShowSingleCountry={showSingleCountry}
      />
      {message && <p>{message}</p>}
    </>
  );
}

export default App;
