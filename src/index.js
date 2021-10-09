import {
  hideElement,
  showElement,
  addSelectedClass,
  removeSelectedClass,
} from "./utils.js";

import { loadContinentSectionData } from "./continent.js";
import { loadCountrySection } from "./country.js";
import { prepareAllData } from "./data.js";

/** global variables */
const selectedCountry = localStorage.getItem("selectedCountry") || "Israel";
const selectedRegion = localStorage.getItem("selectedRegion") || "as";
const covidData = localStorage.getItem("covidData") || null;
const firstTime = localStorage.getItem("firstTime") || true;

/** Side Nav */
const continentBtn = document.querySelector("#continentBtn");
const countryBtn = document.querySelector("#countryBtn");

/** Continent Section*/
const continentSection = document.querySelector(".continent");
const regionsSelect = document.querySelector(".regionsSelect");

/** Country Section*/
const countrySection = document.querySelector(".country");

/*********************************************************** MAIN ************************************************** */
(function main() {
  if (!covidData) {
    prepareAllData();
  }
  loadContinentSectionData(continentSection);
  loadCountrySection(countrySection);
})();

/*********************************************************** MAIN ************************************************** */
export function showCountrySection() {
  hideElement(continentSection);
  showElement(countrySection);
  addSelectedClass(countryBtn);
  removeSelectedClass(continentBtn);
}

export function showContinentSection() {
  hideElement(countrySection);
  showElement(continentSection);
  addSelectedClass(continentBtn);
  removeSelectedClass(countryBtn);
}

countryBtn.addEventListener("click", showCountrySection);
continentBtn.addEventListener("click", showContinentSection);
