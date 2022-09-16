/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Weather Dashboard JS - Index
 * Last Edited by Arielle Sept 14 2022
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

var submitBtn = $('#submitBtn');
var cityInput = $('#textBox');
var responseText = $('#responseText');

/**
 * On page load, detects whether user has been here before
 * (Has existing local storage data)
 * If so, immediately redirects them to the dashboard with their last searched city
 */
function checkStorage() {
    if (JSON.parse(localStorage.getItem('previousCities')) !== null) {
        console.log("Welcome back! Redirecting you.");
        window.location.replace('./dashboard.html');

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
    var userCity = $.trim(cityInput.val());
    var toPascalCase = str =>
        str.replace(/\w\S*/g, m => m.charAt(0).toUpperCase()
            + m.substr(1).toLowerCase());
    var city = toPascalCase(userCity);
    console.log(city);
    var currentAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=dea2c2776d8164b3f477e18601a99e35';
    fetch(currentAPI)
        .then(function (response) {
            console.log(response.status);
            //  Conditional for the the response.status.
            if (response.status !== 200) {
                // Place the response.status on the page.
                responseText.text("Please enter a valid city.");
            } else {
                responseText.text("");
                localStorage.setItem("firstCity", JSON.stringify(city));
                window.location.replace('./dashboard.html');
            }
        });
};



// Sends the click event up to weatherInputHandler
submitBtn.click(function(event){
    homeInputHandler(event);
});
