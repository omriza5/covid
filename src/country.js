import { prepareAllData } from "./data.js";
import { getSelectedCountry } from "./countriesService.js";

const selectInput = document.querySelector("#countrySelect");
const content = document.querySelector(".content");
const countryName = document.querySelector(".country-name");
const covidData = JSON.parse(localStorage.getItem("covidData"));
const selectedCountry = localStorage.getItem("selectedCountry") || "Israel";

import { populateSelectOptions } from "./groupSelect.js";
export async function loadCountrySection() {
  const covidData = await prepareAllData();
  selectInput.addEventListener("change", handleSelectClick);
  populateSelectOptions(selectInput, covidData);
  setCountryName();
  displayCountryData();
}

function handleSelectClick(e) {
  const country = e.target.value;
  localStorage.setItem("selectedCountry", country);
  setCountryName();
  displayCountryData();
}

function setCountryName() {
  const selectedCountry = localStorage.getItem("selectedCountry");
  countryName.innerHTML = selectedCountry;
}

export async function displayCountryData() {
  const data = covidData || (await prepareAllData());
  const country = getSelectedCountry(data);

  if (!country) return;
  const totalCases = document.querySelector("#totalCases");
  const newCases = document.querySelector("#newCases");
  const totalDeaths = document.querySelector("#totalDeaths");
  const newDeath = document.querySelector("#newDeath");
  const totalRecovered = document.querySelector("#totalRecovered");
  const criticalCondition = document.querySelector("#criticalCondition");

  totalCases.innerHTML = country.latestData.confirmed;
  totalDeaths.innerHTML = country.latestData.deaths;
  totalRecovered.innerHTML = country.latestData.recovered;
  criticalCondition.innerHTML = country.latestData.critical;
  newCases.innerHTML = country.today.confirmed;
  newDeath.innerHTML = country.today.deaths;
}
