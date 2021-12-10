import { myChart2, buildDoughnutChart } from "./graph.js";

export const select = document.querySelector("select");
export const circle = document.querySelector(".circle");
export const countryContainer = document.querySelector(".country_container");

// select a spicific country
select.addEventListener("click", (e) => {
  getCountryAPI(e.target.value);
  circle.classList.remove("displayNone");
  countryContainer.classList.remove("visibilityHidden");
  myChart2.destroy();
});

// get country API by country code.
async function getCountryAPI(countryCode) {
  const countryData = await axios.get(
    `https:///corona-api.com/countries/${countryCode}`
  );
  preparingForCountryChart(countryData.data.data.latest_data);
}

// preparing data for country chart.
function preparingForCountryChart(data) {
  const dataArr = [data.deaths, data.confirmed, data.critical, data.recovered];
  buildDoughnutChart(dataArr);
}