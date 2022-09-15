/*
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Weather Dashboard JS - Index
 * Last Edited by Arielle Sept 14 2022
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

/**
 * On page load, detects whether user has been here before
 * (Has existing local storage data)
 * If so, immediately redirects them to the dashboard with their last searched city
 */
function checkStorage() {
    if (localStorage.getItem('previousCities') !== null) {
        console.log("Welcome back!");
        window.location.replace("/dashboard.html");
    } else {
        console.log("Welcome, new user!");
    };
};
