import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;

const getWeather = async (capital) => {
  const today = new Date().toISOString().split("T")[0];
  const request = axios.get(`${BASE_URL}/${capital}/${today}/?key=${api_key}`);
  return request.then((response) => response.data.currentConditions);
};

export default getWeather;
