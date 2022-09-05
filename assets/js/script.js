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
var weatherBlocks = $('#weatherBlocks');
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
        weatherBlocks.text('');
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
        weatherSearchTerm.text('');
        weatherBlocks.text('');
        cityInput.text('');
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


// Start displaying the collected information on the page given the data retrieved previously
// We need to switch away from "city" since it might become a parameter
var displayWeather = function (data, searchTerm) {
    // Generate the content for the one day forecast section
    weatherSearchTerm.text(data.name);
    $("#wicon").attr("src", 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    $("#conditions").text('Current Conditions: ' + data.weather[0].description);

    $("#weatherList").append('<li>' + "Temperature:" + '</li>');
    $("#weatherList").append('<li>' + "Humidity:" + '</li>');
    $("#weatherList").append('<li>' + "Wind Speed:" + '</li>');

    $("#weatherData").append('<li>' + (Math.round(data.main.temp)) + " " + "°F" + '</li>');
    $("#weatherData").append('<li>' + data.main.humidity + " " + "%" + '</li>');
    $("#weatherData").append('<li>' + data.wind.speed + " " + "mph" + '</li>');
};

/**
 * Stuff I wanna grab from the API:

 * Basic Description: data.weather[0].description

 * Icon: data.weather[0].icon
 */


// Input handler for when submit button is pressed
// Sends the click event up to weatherInputHandler
submitBtn.click(function(event){
    weatherInputHandler(event);
});

/**
 * BLOCK LAYOUT FOR ONE DAY FORECAST

    <div id ="oneDay">
        <div id ="cityDate">
            <h2 id="weather-search-term"></h2>
            <!--Title of city and current date will go here-->
        </div>
        <div id ="weatherInfo">
            <!--Weather info for the selected city will go here-->
            <ul>
                <li>Temperature: </li>
                <li>Wind Speed: </li>
                <li>Humidity: </li>
            </ul>
        </div>
    </div>
*/

/**
 * BLOCK LAYOUT FOR FIVE DAY FORECAST BLOCKS

    <div class="dayBlock col-12 col-sm-12 col-md-12 col-lg-2">
        <h4>Wed</h4>
        <h5>Sept 4 2022</h5>
        <i class="fa-duotone fa-sun-cloud"></i>
        <ul>
            <li>Temp:</li>
            <li>Wind:</li>
            <li>Humidity:</li>
        </ul>
    </div>
*/






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
