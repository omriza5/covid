import { getAllCountries, mapCountriesToRegions } from "./countriesService.js";
import { regions } from "./data.js";

const COVID_ENDPOINT = "https://corona-api.com/countries";

export const getCovidData = async () => {
  try {
    const response = await fetch(COVID_ENDPOINT);
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log("GET COVID DATA: ", error);
  }
};

export const mapCovidDataToRegions = (data) => {
  let obj = {};
  return regions.map((region) => {
    const filtered = data.filter((c) => c.region === region.name);
    return {
      ...obj,
      [region.name]: filtered,
    };
  });
};
