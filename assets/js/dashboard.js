/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Weather Dashboard JS - Dashboard
 * Last Edited by Arielle Sept 14 2022
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
var citiesHistory = $('#citiesHistory');
var prevBtn = $('.button-cities');


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
                    checkPrevCity(city);
                });
            } else {
                console.log('Error:' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('Unable to connect to Open Weather API');
        });
};

// Check to see if the city already exists
// TODO: Restrict total number of entries to 10
var checkPrevCity = function (city) {
    citiesHistory.text('');
    console.log("Checking " + city);
    var previousCitiesArr = JSON.parse(localStorage.getItem("previousCities")) || [];
    if (localStorage.getItem('previousCities') !== null) {
        console.log(`Current cities exist`);
        previousCitiesArr = JSON.parse(localStorage.getItem('previousCities'));
        // Check if the current city exists already in local storage
        // Else add the new city to the array and set the new array to local storage
        if (previousCitiesArr.includes(city)) {
            console.log('City exists');
        } else {
            console.log('City is not found - new city.');
            previousCitiesArr.splice(0, 0, city);
            var count = previousCitiesArr.length;
            console.log("New array length: " + count);
            if (count >= 10) {
                previousCitiesArr.pop();
                console.log("Last item removed. " + count);
            }
            localStorage.setItem("previousCities", JSON.stringify(previousCitiesArr));
        };
      } else {
        console.log(`Cities storage not found. Creating object from initial`);
        previousCitiesArr = [];
        previousCitiesArr.push(city);
        localStorage.setItem("previousCities", JSON.stringify(previousCitiesArr));
    }; // END if
    postPreviousCities(previousCitiesArr);
};

var postPreviousCities = function (previousCitiesArr) {

    $.each(previousCitiesArr, function (i) {
        previousCitiesArr = JSON.parse(localStorage.getItem('previousCities'));
        citiesHistory.append($('<button>').text(previousCitiesArr[i]).attr('id', previousCitiesArr[i]).addClass('button-cities col-12'));
    });
};

// Start displaying the collected information on the page given the data retrieved previously
// We need to switch away from "city" since it might become a parameter
var displayWeather = function (data, city) {
    // Generate the content for the one day forecast section
    weatherSearchTerm.text(data.name);

    $("#conditions")
        .text('Current Conditions: ' + data.weather[0].description);

     $("#wicon")
        .attr("src", 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');

    $("#weatherList")
        .append('<li>' + "Temp:" + '</li>');
    $("#weatherList")
        .append('<li>' + "Humidity:" + '</li>');
    $("#weatherList")
        .append('<li>' + "Wind:" + '</li>');

    $("#weatherData")
        .append('<li>' + (Math.round(data.main.temp)) + " " + "°F" + '</li>');
    $("#weatherData")
        .append('<li>' + data.main.humidity + " " + "%" + '</li>');
    $("#weatherData")
        .append('<li>' + data.wind.speed + " " + "mph" + '</li>');

    getForecast(city);
};

// Generate the content for the five day forecast
// Specify for imperial units and only the next 5 days

var getForecast = function (city) {
    console.log("Forecast for " + city);
    var forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q='
        + city + '&units=imperial&appid=435fcbf53b60753e425fe48c7b6d8c16';

    fetch(forecastAPI)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // Pushes the data and city values to the displayForecast function to be used
                    displayForecast(data, city);
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
var displayForecast = function (data, city) {
    var forDate = data.list;
    console.log(forDate);
    var forecastArr = [];
       $.each(forDate, function (i) {
            if (forDate[i].dt_txt.includes("12:00:00")) {
                forecastArr.push(forDate[i]);
            }
       });

    console.log(forecastArr);
    generateForecast(forecastArr, city);
};

var generateForecast = function (forecastArr, city) {
    fiveDayWeatherEl
        .children("h2")
        .text("5 Day Forecast for " + city)
        .attr('style', 'margin-top:2rem');

    $.each(forecastArr, function (i) {

        // Create the weather block
        var thisBlock = $('<div>');
        thisBlock.addClass('dayBlock col-12 col-sm-12 col-md-12 col-lg-2');
        weatherBlocks.append(thisBlock);

        // Convert the display date into a day of the week using a weekArr array index value
        var dateConv = new Date(forecastArr[i].dt_txt);
        var dayOW = dateConv.getDay();
        var weekArr = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];

        // Append the day of week data to the new dateBlock div
        thisBlock.append('<h4>' + weekArr[dayOW] + '</h4>');

        // Convert the date to just show the month and date
        var dateFull = (forecastArr[i].dt_txt);
        var date = moment(dateFull, "YYYY-MM-DD HH:mm:ss").format("MMM, DD");
        var dateEl =$('<b><p>').text(date);
        thisBlock.append(dateEl);

        // Add weather icon
        thisBlock.append($('<img>').attr("src", 'http://openweathermap.org/img/w/' + forecastArr[i].weather[0].icon + '.png'));


        var weatherList = $('<ul>');
        thisBlock.append(weatherList);

        weatherList.append('<li>Temp: ' + (Math.round(forecastArr[i].main.temp)) + ' ' + '°F');
        weatherList.append('<li>Humidity: ' + forecastArr[i].main.humidity + ' ' + '%');
        weatherList.append('<li>Wind: ' + forecastArr[i].wind.speed + ' ' + 'mph');
    });

};

// Delegated on click binding will seek out all generated elements with the same class, and apply the same event
$("#citiesHistory").on("click", "button", function(){
    getWeather($(this).text);
});


// Sends the click event up to weatherInputHandler
submitBtn.click(function(event){
    weatherInputHandler(event);
});






// !TODO: Restrict the number of values in recent searches to 10 items (index of 9)

// !TODO: When index is reached, delete the index 9 item
