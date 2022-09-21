// DOM Elements & Variables
var citySearch = $('.citySearch');
var searchBtn = $('.searchBtn');
var searchHistoryContainer = $('.searchHistory');
var cityHistory = [];
var cityName = $('.cityName');
var cityTemp = $('.cityTemp');
var cityWind = $('.cityWind');
var cityHumidity = $('.cityHumidity');
var fiveDayContainer = $('.fiveDayContainer');
var APIKey = 'f28365ef199fb9cd47b8171923d046b6'

// Get Searched City Name
searchBtn.click(searchCity);

function searchCity() {
    var userCityName = citySearch.val();
    addToHistory(userCityName);

    var userLat;
    var userLon;

    var fetchURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userCityName + '&appid=' + APIKey;
    fetch(fetchURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       userLat = data[0].lat;
       userLon = data[0].lon;
       fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + userLat + '&lon=' + userLon + '&units=imperial&appid=' + APIKey)
       .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data);
        })
    })
}

function addToHistory(city) {
    cityHistory.push(city);
    for (i = 0; i < cityHistory.length; i++) {
        searchHistoryEl = document.createElement('button');
        searchHistoryEl.setAttribute('class', 'btn btn-secondary col-12 mb-3');
        searchHistoryEl.innerText = city;
        searchHistoryContainer.append(searchHistoryEl);
    }
}