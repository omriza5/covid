import { regions } from "./data.js";
import { populateSelectOptions } from "./select.js";
import { renderChart } from "./graph.js";

const buttonsLabel = ["Confirmed", "Deaths", "Recovered", "Critical Condition"];

/** query elements */
const graphCanvas = document.querySelector("canvas");
const buttonsContainer = document.querySelector(".continent-buttons");
const selectInput = document.querySelector("#regionsSelect");

const region = localStorage.getItem("selectedRegion");
const selectedMode = localStorage.getItem("selectedMode") || "Confirmed";

export const loadContinentSectionData = () => {
  selectInput.addEventListener("change", handleSelectClick);
  createContinentBtns(buttonsContainer);
  populateSelectOptions(selectInput, regions);
  updateGraph();
};

const createContinentBtns = (buttonsContainer) => {
  if (buttonsContainer.children.length < 4) {
    buttonsLabel.forEach((label) => {
      const btn = document.createElement("div");
      btn.innerHTML = label;
      btn.classList.add("stat-btn");
      btn.addEventListener("click", handleButtonClick);
      buttonsContainer.append(btn);
    });
  }
};

const updateGraph = () => {
  renderChart(graphCanvas);
};

const handleButtonClick = (e) => {
  localStorage.setItem("selectedMode", e.target.innerHTML);
  updateGraph();
};

const handleSelectClick = (e) => {
  const region = e.target.value;
  localStorage.setItem("selectedRegion", region);

  updateGraph();
};
