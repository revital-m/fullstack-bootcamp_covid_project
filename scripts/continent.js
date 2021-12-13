import { selectingCountry } from "./country.js";
import { btnContainerChart, chosenObj, flagLoad } from "./app.js";
import { myChart, preparingForChart } from "./graph.js";

const dataContainerBtn = document.querySelector(".btnContainer__continent");
const dataContainerSelect = document.querySelector(".dataContainer__select");
export const infoContainerTotal = document.querySelector(
  ".infoContainer__total"
);

dataContainerBtn.addEventListener("click", (e) => {
  if (flagLoad && e.target.innerText.length <= 10) {
    chosenObj.chosenBtn = `${e.target.innerText}`;
    myChart.destroy();
    preparingForChart();
    displayNone(e.target.innerText.toLowerCase());
    selectingCountry.classList.remove("displayNone");
    btnContainerChart.classList.add("displayNone");
    infoContainerTotal.classList.add("visibilityHidden");
  }
});

// display only the countries in the selected continent in drop down list.
function displayNone(continent) {
  const allCountryArr = document.querySelectorAll(`option`);
  for (let i = 0; i < allCountryArr.length; i++) {
    allCountryArr[i].classList.add("displayNone");
  }

  const selectCountry = document.querySelector(`[data-id="select country"]`);
  selectCountry.selected = true;
  selectCountry.classList.remove("displayNone");

  const countryArr = document.querySelectorAll(
    `[data-continent="${continent}"]`
  );
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
