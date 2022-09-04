/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Weather Dashboard JS
 * Last Edited by Arielle Sept 4 2022
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

var apiKey = '435fcbf53b60753e425fe48c7b6d8c16';
var apiURL = 'http://api.openweathermap.org/data/2.5/weather?';

var submitBtn = $('#submitBtn');
var userInput = $('#textBox');

/**
 * Basic test for retrieving input from user from textarea element
 */

function retrieveInput() {
    var input = $.trim(userInput.val());
    console.log(input);
}

submitBtn.click(function() {
    retrieveInput();
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
