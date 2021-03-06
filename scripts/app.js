import { addSelectionCountry, infoContainerTotal } from "./continent.js";
import { selectingCountry } from "./country.js";
import { myChart, preparingForChart } from "./graph.js";

export let flagLoad = false;
const worldBtn = document.querySelector('[data-id="worldBtn"]');
export const circleContinent = document.querySelector('[data-id="continent"]');

export const btnContainerChart = document.querySelector(".btnContainer__chart");

export const DeathsTotal = document.querySelector('[data-id="Deaths"]');
export const ConfirmedTotal = document.querySelector('[data-id="Confirmed"]');
export const CriticalTotal = document.querySelector('[data-id="Critical"]');
export const RecoveredTotal = document.querySelector('[data-id="Recovered"]');

const continentMap = new Map(); // save the code contry as a key & the continent as the value.

// save the total deaths, confirmed, recovered & critical casses for each continent.
export const continentObj = {
  // continent: [totalDeaths, totalConfirmed, totalCritical, totalRecovered].
  asia: [0, 0, 0, 0],
  africa: [0, 0, 0, 0],
  americas: [0, 0, 0, 0],
  europe: [0, 0, 0, 0],
  australia: [0, 0, 0, 0],
  totalDeaths: 0,
  totalConfirmed: 0,
  totalCritical: 0,
  totalRecovered: 0,
};

export const chosenObj = {
  idx: {
    Deaths: 0,
    "Confirmed Cases": 1,
    "Critical Cases": 2,
    "Recovered Cases": 3,
  },
  chosenBtn: "World",
  chosenData: "Recovered Cases",
  typeOfChart: {
    World: "pie",
    Asia: "bar",
    Africa: "bar",
    Americas: "bar",
    Europe: "bar",
    Australia: "bar",
  },
};

// get the API for all the continents and the world covid data.
async function getFetch() {
  const asiaData = axios.get(
    "https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/asia"
  );
  const africaData = axios.get(
    "https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/africa"
  );
  const americasData = axios.get(
    "https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/Americas"
  );
  const europeData = axios.get(
    "https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/europe"
  );
  const australiaData = axios.get(
    "https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/oceania"
  );
  const worldData = axios.get("https://corona-api.com/countries");

  const results = await Promise.all([
    asiaData,
    africaData,
    americasData,
    europeData,
    australiaData,
    worldData,
  ]);

  circleContinent.classList.remove("displayNone");
  addToHash(results[0].data, "asia");
  addToHash(results[1].data, "africa");
  addToHash(results[2].data, "americas");
  addToHash(results[3].data, "europe");
  addToHash(results[4].data, "australia");

  calcWorldData(results[5].data.data);
  flagLoad = true;
}


// adding the code contry as a key & the continent as the value for every contry.
function addToHash(resultsArray, contientName) {
  for (let i = 0; i < resultsArray.length; i++) {
    continentMap.set(resultsArray[i].cca2, contientName);
    addSelectionCountry(
      resultsArray[i].name.common,
      contientName,
      resultsArray[i].cca2
    );
  }
}

// calculate the total deaths, confirmed, recovered & critical casses for each continent, and the total for the world.
function calcWorldData(WorldDataArray) {
  for (let i = 0; i < WorldDataArray.length; i++) {
    const continentName = continentMap.get(`${WorldDataArray[i].code}`);
    if (continentName) {
      continentObj[`${continentName}`][0] +=
        WorldDataArray[i].latest_data.deaths;
      continentObj.totalDeaths += WorldDataArray[i].latest_data.deaths;
      continentObj[`${continentName}`][1] +=
        WorldDataArray[i].latest_data.confirmed;
      continentObj.totalConfirmed += WorldDataArray[i].latest_data.confirmed;
      continentObj[`${continentName}`][2] +=
        WorldDataArray[i].latest_data.critical;
      continentObj.totalCritical += WorldDataArray[i].latest_data.critical;
      continentObj[`${continentName}`][3] +=
        WorldDataArray[i].latest_data.recovered;
      continentObj.totalRecovered += WorldDataArray[i].latest_data.recovered;
    }
  }
  preparingForChart();
  addToTotal();
}

// add the total numbers to the info btns.
function addToTotal() {
  DeathsTotal.innerText = `${continentObj.totalDeaths}`;
  ConfirmedTotal.innerText = `${continentObj.totalConfirmed}`;
  CriticalTotal.innerText = `${continentObj.totalCritical}`;
  RecoveredTotal.innerText = `${continentObj.totalRecovered}`;
}

worldBtn.addEventListener("click", (e) => {
  myChart.destroy();
  chosenObj.chosenBtn = "World";
  chosenObj.chosenData = "Recovered Cases";
  preparingForChart();
  selectingCountry.classList.add("displayNone");
  btnContainerChart.classList.remove("displayNone");
  infoContainerTotal.classList.remove("visibilityHidden");
  addToTotal();
});

btnContainerChart.addEventListener("click", (e) => {
  myChart.destroy();
  chosenObj.chosenData = `${e.target.innerText}`;
  preparingForChart();
});

getFetch();