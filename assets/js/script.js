/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Weather Dashboard JS - Index
 * Last Edited by Arielle Sept 14 2022
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

var submitBtn = $('#submitBtn');
var cityInput = $('#textBox');

/**
 * On page load, detects whether user has been here before
 * (Has existing local storage data)
 * If so, immediately redirects them to the dashboard with their last searched city
 */
function checkStorage() {
    if (JSON.parse(localStorage.getItem('previousCities')) !== null) {
        console.log("Welcome back! Redirecting you.");
        window.location.replace("/dashboard.html");

    } else {
        console.log("Welcome, new user!");
    };
};

/**
 * Handler from submit button will grab the input from the user
 * And send that value to local storage for the dashboard to load
 *
 *
 */
var homeInputHandler = function (event) {
    event.preventDefault();
    var city = $.trim(cityInput.val());
    console.log(city);
    if (city) {
        localStorage.setItem("firstCity", JSON.stringify(city));
        window.location.replace("/dashboard.html");
    } else {
        console.log("No city input yet");
        return;
    }
};


// Sends the click event up to weatherInputHandler
submitBtn.click(function(event){
    homeInputHandler(event);
});
