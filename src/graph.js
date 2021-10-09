import { showCountrySection } from "./index.js";
import { displayCountryData } from "./country.js";

let chart;
export const renderChart = (element) => {
  const covidData = JSON.parse(localStorage.getItem("covidData"));
  const region = localStorage.getItem("selectedRegion");
  const selectedMode = localStorage.getItem("selectedMode") || "Confirmed";
  if (!covidData || !region) return;

  const selectedRegion = findSelectedRegion(region, covidData);
  const countriesNames = mapCountriesNames(selectedRegion[0][region]);

  const data = getDataByMode(region, selectedMode, covidData);
  if (chart) chart.destroy();

  const options = {
    type: "bar",
    data: {
      labels: [...countriesNames],
      datasets: [
        {
          label: selectedMode,
          data,
          backgroundColor: "#474862",
        },
      ],
    },
    options: {
      onClick: (event) => {
        const datasetIndex = chart.getElementAtEvent(event)[0]._datasetIndex;

        const { label: country } =
          chart.getElementsAtEvent(event)[datasetIndex]._model;
        handleCountryClick(country);
      },
    },
  };
  chart = new Chart(element, options);
};

const findSelectedRegion = (region, covidData) => {
  if (covidData) return covidData.filter((r) => r[region] !== undefined);
};

const mapCountriesNames = (countries) => {
  return countries.map((c) => c.name);
};

const getDataByMode = (region, mode, covidData) => {
  const selectedRegion = findSelectedRegion(region, covidData)[0][region];
  mode = mode.toLowerCase();

  /** special case where mode name is "critical Condition" */
  if (mode === "critical condition") mode = "critical";
  return selectedRegion.map((c) => c.latestData[mode]);
};

const handleCountryClick = (country) => {
  const countryName = document.querySelector(".country-name");
  const countrySelect = document.querySelector("#countrySelect");

  localStorage.setItem("selectedCountry", country);
  const selectedCountry = localStorage.getItem("selectedCountry");
  countryName.innerHTML = selectedCountry;
  countrySelect.value = selectedCountry;
  showCountrySection();
  displayCountryData();
};
