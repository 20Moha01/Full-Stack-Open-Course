import axios from "axios";
const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

// The purpose of this class is to load all the countries one time only during the life of the react app.
class CountriesData {
  constructor() {
    if (!CountriesData.instance) {
      this.data = null;
      this.isLoaded = false;
      CountriesData.instance = this;
    }
    return CountriesData.instance;
  }

  loadCountriesData() {
    if (this.isLoaded) {
      return Promise.resolve(this.data);
    }
    const request = axios.get(`${BASE_URL}/all`);
    this.data = request.then((response) => response.data);
    this.isLoaded = true;
    return this.data;
  }
}

const instance = new CountriesData();
export default instance;
