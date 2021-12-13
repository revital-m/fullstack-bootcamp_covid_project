import { chosenObj, circleContinent, continentObj } from "./app.js";

const canvasChart = document.querySelector(".dataContainer__chart");
const dataContainerCanvas = document.querySelector(".dataContainer__canvas");
const dataContainerCanvasTitle = document.querySelector(
  ".dataContainer__canvas--title"
);

export let myChart = "";

// preparing the data for chart.
export function preparingForChart() {
  let dataArr = [];
  let labelsArr = [];
  const idxData = chosenObj.idx[`${chosenObj.chosenData}`];
  const chartType = chosenObj.typeOfChart[`${chosenObj.chosenBtn}`];

  if (chosenObj.chosenBtn === "World") {
    dataArr = [
      continentObj.asia[idxData],
      continentObj.africa[idxData],
      continentObj.americas[idxData],
      continentObj.europe[idxData],
      continentObj.australia[idxData],
    ];

    labelsArr = ["Asia", "Africa", "America", "Europe", "Australia"];

    dataContainerCanvasTitle.innerText = `Global Data of Covid-19, ${chosenObj.chosenData}`;
  } else {
    dataArr = continentObj[chosenObj.chosenBtn.toLowerCase()];
    labelsArr = ["Deaths", "Confirmed", "Critical", "Recovered"];
    dataContainerCanvasTitle.innerText = `${chosenObj.chosenBtn} Data of Covid-19`;
  }

  buildChart(dataArr, chosenObj.chosenBtn, labelsArr, chartType);
}

// creating the contient chart.
function buildChart(
  dataArray,
  nameOfContient,
  labelsArray,
  typeOfChart
) {
  myChart = new Chart(canvasChart, {
    type: `${typeOfChart}`,
    data: {
      labels: labelsArray,
      datasets: [
        {
          label: nameOfContient,
          data: dataArray,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
        position: "right",
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  circleContinent.classList.add("displayNone");
  if (typeOfChart === "bar") {
    dataContainerCanvas.classList.add("dataContainer__canvas--width");
  } else {
    dataContainerCanvas.classList.remove("dataContainer__canvas--width");
  }
}