import { ConfirmedTotal, CriticalTotal, DeathsTotal, RecoveredTotal } from "./app.js";
import { infoContainerTotal } from "./continent.js";

export const selectingCountry = document.querySelector("select");
export const infoContainer = document.querySelector(".infoContainer");

// select a spicific country
selectingCountry.addEventListener("click", (e) => {
  getCountryAPI(e.target.value);
});

// get country API by country code.
async function getCountryAPI(countryCode) {
  const countryData = await axios.get(
    `https:///corona-api.com/countries/${countryCode}`
  );
  addToTotalCountry(countryData.data.data.latest_data);
}

// add the total numbers to the info btns.
function addToTotalCountry(data) {
  infoContainer.classList.add('infoContainer--country');
  
  DeathsTotal.innerText = `${data.deaths}`;
  ConfirmedTotal.innerText = `${data.confirmed}`;
  CriticalTotal.innerText = `${data.critical}`;
  RecoveredTotal.innerText = `${data.recovered}`;
  infoContainerTotal.classList.remove("visibilityHidden");

}
