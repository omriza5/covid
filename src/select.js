export const populateSelectOptions = (element, items) => {
  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.innerHTML = "";
  element.appendChild(emptyOption);
  for (let item of items) {
    const option = document.createElement("option");
    option.value = item.name;
    option.innerHTML = item.name;

    element.appendChild(option);
  }
};
