/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Weather Dashboard JS
 * Last Edited by Arielle Sept 4 2022
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

var apiKey = 'dea2c2776d8164b3f477e18601a99e35';

// Test URL for fetching data
var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=Longmont&appid=dea2c2776d8164b3f477e18601a99e35"

var submitBtn = $('#submitBtn');
var cityInputEl = $('#textBox');
var oneDayWeatherEl = $('#oneDay');
var fiveDayWeatherEl = $('#fiveDay');

// Handles what happens when input is typed into the city input area, and the submit button (event) takes place
// Prevent default for unwanted behavior
// Clear out the existing text content before putting more in

var weatherInputHandler = function (event) {
    event.preventDefault();
    var city = cityInputEl.val.trim();
    if (city) {
        getWeather(city);
        oneDayWeatherEl.textContent('');
        fiveDayWeatherEl.textContent('');
        cityInputEl.textContent('');
    } else {
        console.log("No city input");
        return;
    }
};

var previousCityHander = function (event) {
     // `event.target` is a reference to the DOM element of the city button that is clicked
     var prevCity = event.target.getAttribute('cities');

     // If there is no city read from the button, don't attempt to fetch the weather info
     if (prevCity) {
       getWeather(prevCity);
         oneDayWeatherEl.textContent = '';
         fiveDayWeatherEl.textContent = '';
    }
};

/**
 * Function retrieves data from open weather API based on the city that is provided by the user
 * Upon fetching the info based on the retrieval URL (which includes the city)
 * If there's a good response, and the response contains JSON, then push that data and city to the displayWeather function
 * If it can't get a response, log an error.
 * THEN as a final measure, if after that promise, it catches the error, then log in console that the API could not be reached
 * And DON'T proceed onto the next function
*/

var getWeather = function (city) {

    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=dea2c2776d8164b3f477e18601a99e35';
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data, city);
                });
            } else {
                console.log('Error:' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('Unable to connect to Open Weather API');
        })
};













// !TODO: Convert input into addition to URL string to make API equiry

// !TODO: TRY to sanitise results


/** !TODO: Parse API enquiry into values for
 * - Temperature
 * - Wind Speed
 * - Humidity
 *
 * For:
 * - Current day
 * - And next 5 days after current day
 */

// !TODO: Append current day's data to the oneDay section

// !TODO: Append next 5 day's data to the fiveDay section

// !TODO: Save last succesfully found city to local storage under recentSearches object

// !TODO: Push latest value to the front of the object

// !TODO: Generate the value as a button in the sidebar

// !TODO: Restrict the number of values in recent searches to 10 items (index of 9)

// !TODO: When index is reached, delete the index 9 item
