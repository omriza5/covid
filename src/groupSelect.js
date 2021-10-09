import { regions } from "./data.js";

export const populateSelectOptions = (element, items) => {
  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.innerHTML = "";
  element.appendChild(emptyOption);

  for (let i = 0; i < regions.length; i++) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = regions[i].name;
    items[i][regions[i].name].forEach((item) => {
      const option = document.createElement("option");
      option.value = item.name;
      option.innerHTML = item.name;
      optgroup.appendChild(option);
    });

    element.appendChild(optgroup);
  }
};
