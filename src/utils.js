export const hideElement = (element) => {
  element.style.display = "none";
};

export const showElement = (element) => {
  element.style.display = "block";
};

export const addSelectedClass = (element) => {
  element.classList.add("selected");
};
export const removeSelectedClass = (element) => {
  element.classList.remove("selected");
};

export const addLoader = (element) => {
  const loader = document.createElement("div");
  loader.classList.add("loader");
  element.append(loader);
};
