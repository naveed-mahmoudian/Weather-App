// DOM Elements & Variables
var citySearch = $(".citySearch");
var searchBtn = $(".searchBtn");
var searchHistoryContainer = document.querySelector(".searchHistory");
var cityHistory = [];
var cityName = $(".cityName");
var cityTemp = $(".cityTemp");
var cityWind = $(".cityWind");
var cityHumidity = $(".cityHumidity");
var fiveDayContainer = $(".fiveDayContainer");
var formGroup = $("#form");
var buttonContainer = $("#buttonContainer");
var APIKey = "f28365ef199fb9cd47b8171923d046b6";
var cityStorage;

// Search Button Event Listener
searchBtn.click(searchCity);

init();
// Initializes the page with local storage and adds to history
function init() {
  cityStorage = JSON.parse(localStorage.getItem("cityStorage")) || [];
  addToHistory();
}

// Searches for city that was typed in
function searchCity(event) {
  event.preventDefault();

  if (citySearch.val() === "") {
    $("#errorModal").modal("show");
  } else {
    var userCityName = citySearch
      .val()
      .split(" ")
      .map((c) => c[0].toUpperCase() + c.substring(1).toLowerCase())
      .join(" ");
    saveCity({ city: userCityName });
    fetchCityData(userCityName);
    citySearch.val("");
  }
}

// Saves city to local storage
function saveCity(city) {
  cityStorage.push(city);
  localStorage.setItem("cityStorage", JSON.stringify(cityStorage));
}

// Fetches city data and displays it
function fetchCityData(city) {
  buttonContainer.html("");
  buttonContainer.html(`<button class="btn btn-primary searchBtn mt-2 col-12" type="button" disabled>
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Loading Weather...
  </button>`);
  var userLat;
  var userLon;
  var fetchURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    APIKey;
  fetch(fetchURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      userLat = data[0].lat;
      userLon = data[0].lon;
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          userLat +
          "&lon=" +
          userLon +
          "&units=imperial&appid=" +
          APIKey
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          cityName.text(data.city.name);
          cityTemp.text(Math.round(data.list[0].main.temp));
          cityWind.text(data.list[0].wind.speed);
          cityHumidity.text(data.list[0].main.humidity);

          addToHistory();

          fiveDayForecast = [
            {
              date: data.list[8].dt_txt.slice(0, -9),
              temp: data.list[8].main.temp,
              wind: data.list[8].wind.speed,
              humidity: data.list[8].main.humidity,
            },
            {
              date: data.list[16].dt_txt.slice(0, -9),
              temp: data.list[16].main.temp,
              wind: data.list[16].wind.speed,
              humidity: data.list[16].main.humidity,
            },
            {
              date: data.list[24].dt_txt.slice(0, -9),
              temp: data.list[24].main.temp,
              wind: data.list[24].wind.speed,
              humidity: data.list[24].main.humidity,
            },
            {
              date: data.list[32].dt_txt.slice(0, -9),
              temp: data.list[32].main.temp,
              wind: data.list[32].wind.speed,
              humidity: data.list[32].main.humidity,
            },
            {
              date: data.list[39].dt_txt.slice(0, -9),
              temp: data.list[39].main.temp,
              wind: data.list[39].wind.speed,
              humidity: data.list[39].main.humidity,
            },
          ];
          fiveDayContainer.html("");
          for (i = 0; i < fiveDayForecast.length; i++) {
            var card = document.createElement("div");
            card.setAttribute("class", "bg-primary bg-gradient m-1");
            card.setAttribute("id", "forecast" + [i]);
            card.innerHTML = `<div class="card-header"><h4>${
              fiveDayForecast[i].date
            }</h4></div>
          <div class="card-body">
            <p class="card-text">Temp: ${Math.round(
              fiveDayForecast[i].temp
            )} °F</p>
            <p class="card-text">Wind: ${fiveDayForecast[i].wind} MPH</p>
            <p class="card-text">Humidity: ${fiveDayForecast[i].humidity}%</p>
          </div>`;
            fiveDayContainer.append(card);
          }
        });
    })
    .then(function () {
      buttonContainer.html(`<button
        type="submit"
        class="btn btn-primary searchBtn mt-2 col-12"
      >
        Search
      </button>`);
      $(".searchBtn").click(searchCity);
    })
    .catch(function () {
      $("#errorModal").modal("show");
      citySearch.val("");
    });
}

// Adds the searched city to the history list
function addToHistory() {
  if (searchHistoryContainer.childElementCount > 0) {
    searchHistoryContainer.innerHTML = "";
  }
  for (var i = 0; i < cityStorage.length; i++) {
    searchHistoryEl = document.createElement("button");
    searchHistoryEl.setAttribute("class", "btn btn-secondary col-12 mb-3");
    searchHistoryEl.setAttribute("data-city", cityStorage[i].city);
    searchHistoryEl.innerText = cityStorage[i].city;
    searchHistoryContainer.append(searchHistoryEl);
    searchHistoryEl.addEventListener("click", searchCityHistory);
  }
}

// Creates the search history button and functionality
function searchCityHistory(event) {
  if (event.target.hasAttribute("data-city")) {
    fetchCityData(event.target.getAttribute("data-city"));
  }
}
