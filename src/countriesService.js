import { regions } from "./data.js";
const COUNTRIES_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/https://restcountries.herokuapp.com/api/v1/";

export const getAllCountries = async () => {
  try {
    const response = await fetch(`${COUNTRIES_ENDPOINT}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const mapCountriesToRegions = (countries) => {
  const normalized = countries.map((country) => ({
    name: country.name.common,
    region: country.region,
    code: country.cca2,
  }));

  const obj = {};
  const mapped = regions.map((region) => {
    const result = normalized.filter(
      (country) => country.region === region.name
    );
    return {
      ...obj,
      [region.name]: result,
    };
  });

  return mapped;
};

export const getSelectedCountry = (data) => {
  const selectedCountry = localStorage.getItem("selectedCountry");
  for (let i = 0; i < 5; i++) {
    const country = data[i][regions[i].name].find(
      (c) => c.name === selectedCountry
    );
    if (country) return country;
  }
};
