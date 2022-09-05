/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Weather Dashboard JS
 * Last Edited by Arielle Sept 4 2022
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

var apiKey = 'dea2c2776d8164b3f477e18601a99e35';
var submitBtn = $('#submitBtn');
var cityInput = $('#textBox');
var oneDayWeatherEl = $('#oneDay');
var fiveDayWeatherEl = $('#fiveDay');
var weatherSearchTerm = $('#weatherSearchTerm');

var weatherSearchTerm = $('#weather-search-term');

// Handles what happens when input is typed into the city input area, and the submit button (event) takes place
// Prevent default for unwanted behavior
// Clear out the existing text content before putting more in

// Click handler for submit button
var weatherInputHandler = function (event) {
    event.preventDefault();
    var city = $.trim(cityInput.val());
    console.log(city);
    if (city) {
        getWeather(city);
        weatherSearchTerm.text('');
        fiveDayWeatherEl.text('');
        cityInput.text('');
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

    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=dea2c2776d8164b3f477e18601a99e35';
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // Pushes the data and city values to the displayWeather function to be used as
                    displayWeather(data, city);
                });
            } else {
                console.log('Error:' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('Unable to connect to Open Weather API');
        });
};



var displayWeather = function (data, city) {
    weatherSearchTerm.text(city);
    debugger;
};

// Input handler for when submit button is pressed
// Sends the click event up to weatherInputHandler
submitBtn.click(function(event){
    weatherInputHandler(event);
});








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



/**
 * Stuff I wanna grab from the API:
 * data.main.temp (Temperature + degrees F)
 * data.weather[0].main (Conditions eg. Clouds)
 * data.weather[0].wind.speed (Wind Speed + MPH)
 */
