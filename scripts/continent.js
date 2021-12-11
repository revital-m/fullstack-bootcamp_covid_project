import { countryContainer, select } from "./country.js";
import { continentMap, continentObj, flagLoad } from "./app.js";
import { buildBarChart, myChart } from "./graph.js";

const dataContainerBtn = document.querySelector(".btnContainer__continent");
const dataContainerSelect = document.querySelector(".dataContainer__select");

dataContainerBtn.addEventListener("click", (e) => {
  if (flagLoad && e.target.innerText.length <= 10) {
    getContinentData(e.target.innerText);
    displayNone(e.target.innerText.toLowerCase());
    select.classList.remove("visibilityHidden");
    countryContainer.classList.add("visibilityHidden");
  }
});

// get continent data for the chart
export function getContinentData(continentName) {
  let name = continentName.toLowerCase();
  myChart.destroy();
  buildBarChart(continentObj[`${name}`], `${continentName}`);
}

// display only the countries in the selected continent in drop down list.
function displayNone(continent) {
  const allCountryArr = document.querySelectorAll(`option`);
  for (let i = 0; i < allCountryArr.length; i++) {
    allCountryArr[i].classList.add("displayNone");
  }

  const selectCountry = document.querySelector(`[data-id="select country"]`);
  selectCountry.selected = true;
  selectCountry.classList.remove("displayNone");

  const countryArr = document.querySelectorAll(`[data-continent="${continent}"]`);
  for (let i = 0; i < countryArr.length; i++) {
    countryArr[i].classList.remove("displayNone");
  }
}

// add an opition of the country on html
export function addSelectionCountry(countryName, contientName, countryCode) {
  const selection = document.createElement("option");
  selection.innerText = countryName;
  selection.classList.add("displayNone");
  selection.setAttribute("data-continent", contientName);
  selection.setAttribute("value", countryCode);
  dataContainerSelect.appendChild(selection);
}