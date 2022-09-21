// DOM Elements & Variables
citySearch = $('.citySearch');
searchBtn = $('.searchBtn');
searchHistoryContainer = $('.searchHistory');
cityHistory = [];
cityName = $('.cityName');
cityTemp = $('.cityTemp');
cityWind = $('.cityWind');
cityHumidity = $('.cityHumidity');
fiveDayContainer = $('.fiveDayContainer');

// Get Searched City Name
searchBtn.click(searchCity);

function searchCity() {
    userCityName = citySearch.val();
    addToHistory(userCityName);
}

function addToHistory(city) {
    cityHistory.push(city);
    for (i = 0; i < cityHistory.length; i++) {
        searchHistoryEl = document.createElement('button');
        searchHistoryEl.setAttribute('class', 'btn btn-secondary col-12');
        searchHistoryEl.innerText = city;
        searchHistoryContainer.append(searchHistoryEl);
    }
}