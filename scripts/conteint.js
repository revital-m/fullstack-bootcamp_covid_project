import { select } from "./country.js";
import { conteintMap, conteintObj, flagLoad } from "./covid.js";
import { buildBarChart, myChart } from "./graph.js";

const dataContainerBtn = document.querySelector(".data_container-continent");
const dataContainerSelect = document.querySelector(".data_container-select");

dataContainerBtn.addEventListener("click", (e) => {
  if (flagLoad) {
    getConteintData(e.target.innerText);
    displayNone(e.target.innerText.toLowerCase());
    select.classList.remove("visibilityHidden");
  }
});

// get conteint data for the chart
export function getConteintData(conteintName) {
  let name = conteintName.toLowerCase();
  myChart.destroy();
  buildBarChart(conteintObj[`${name}`], `${conteintName}`);
}

// display only the countries in the selected conteint in drop down list.
function displayNone(conteint) {
  const allCountryArr = document.querySelectorAll(`option`);
  for (let i = 0; i < allCountryArr.length; i++) {
    allCountryArr[i].classList.add("displayNone");
  }

  const selectCountry = document.querySelector(`[data-id="select country"]`);
  selectCountry.selected = true;
  selectCountry.classList.remove("displayNone");

  const countryArr = document.querySelectorAll(`[data-conteint="${conteint}"]`);
  for (let i = 0; i < countryArr.length; i++) {
    countryArr[i].classList.remove("displayNone");
  }
}

// add an opition of the country on html
export function addSelectionCountry(countryName, contientName, countryCode) {
  const selection = document.createElement("option");
  selection.innerText = countryName;
  selection.classList.add("displayNone");
  selection.setAttribute("data-conteint", contientName);
  selection.setAttribute("value", countryCode);
  dataContainerSelect.appendChild(selection);
}