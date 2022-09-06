/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Weather Dashboard JS
 * Last Edited by Arielle Sept 4 2022
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


var submitBtn = $('#submitBtn');
var cityInput = $('#textBox');
var oneDayWeatherEl = $('#oneDay');
var fiveDayWeatherEl = $('#fiveDay');
var weatherSearchTerm = $('#weatherSearchTerm');
var weatherBlocks = $('#weatherBlocks');
var weatherSearchTerm = $('#weather-search-term');
var weatherList = $('#weatherList');
var weatherData = $('#weatherData');

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
        weatherData.text('');
        weatherList.text('');
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

    var currentAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=dea2c2776d8164b3f477e18601a99e35';
    fetch(currentAPI)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // Pushes the data and city values to the displayWeather function to be used
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
var displayWeather = function (data, city) {
    // Generate the content for the one day forecast section
    weatherSearchTerm.text(data.name);
    $("#wicon").attr("src", 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    $("#conditions").text('Current Conditions: ' + data.weather[0].description);

    $("#weatherList").append('<li>' + "Temp:" + '</li>');
    $("#weatherList").append('<li>' + "Humidity:" + '</li>');
    $("#weatherList").append('<li>' + "Wind:" + '</li>');

    $("#weatherData").append('<li>' + (Math.round(data.main.temp)) + " " + "°F" + '</li>');
    $("#weatherData").append('<li>' + data.main.humidity + " " + "%" + '</li>');
    $("#weatherData").append('<li>' + data.wind.speed + " " + "mph" + '</li>');

    getForecast(city);
};

// Generate the content for the five day forecast
// Specify for imperial units and only the next 5 days

var getForecast = function (city) {
    console.log("Forecast for " + city);
    var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=435fcbf53b60753e425fe48c7b6d8c16';
    fetch(forecastAPI)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                // Pushes the data and city values to the displayForecast function to be used
                displayForecast(data);
                console.log("Gone to displayForecast");

            });
        } else {
            console.log('Error:' + response.statusText);
        }
    })
    .catch(function (error) {
        console.log('Unable to connect to Open Weather API');
    });
};




// Function to take the 5 day forecast data and display on the page
var displayForecast = function (data) {
    var forDate = data.list;
    console.log(forDate);
    var forecastArr = [];
       $.each(forDate, function (i) {
            if (forDate[i].dt_txt.includes("12:00:00")) {
                forecastArr.push(forDate[i]);
            }
       });

    console.log(forecastArr);
    generateForecast(forecastArr);
};

var generateForecast = function (forecastArr) {

    $.each(forecastArr, function (i) {
        var thisBlock = $('<div>')
        thisBlock.addClass('dayBlock', 'col-12 col-sm-12 col-md-12 col-lg-2');
        weatherBlocks.append(thisBlock);
        var dateConv = new Date(forecastArr[i].dt_txt);
        var dayOW = dateConv.getDay();
        var weekArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        thisBlock.append($('<h3>').text(weekArr[dayOW]));
    });

};



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


/** STUFF I NEED FROM THE FORECAST FETCH
 *
 * Date/parse day of week: data.list[i].dt_txt
 * Temp: data.list[i].main.temp
 * Wind: data.list[i].wind.speed
 * Humidity: data.list[i].main.humidity
 * Desciption: data.list[i].weather.description
 * Icon: data.list[i].weather.icon
 *
 */



// Input handler for when submit button is pressed
// Sends the click event up to weatherInputHandler
submitBtn.click(function(event){
    weatherInputHandler(event);
});







// !TODO: TRY to sanitise results


// !TODO: Append current day's data to the oneDay section

// !TODO: Append next 5 day's data to the fiveDay section

// !TODO: Save last succesfully found city to local storage under recentSearches object

// !TODO: Push latest value to the front of the object

// !TODO: Generate the value as a button in the sidebar

// !TODO: Restrict the number of values in recent searches to 10 items (index of 9)

// !TODO: When index is reached, delete the index 9 item
