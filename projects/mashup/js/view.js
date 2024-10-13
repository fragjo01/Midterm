/* jshint esversion: 8 */
/* jshint browser: true */

var leaguelist = ["Champions League", "Primera Liga", "Premier League", "Eredevise", "Bundesliga", "Ligue 1", "Seria A", "Championship", "La Liga", "Serie A(Brazil)", "World Cup", "Europe"];









function populateSelect(selectId, sList) {
    let sel = document.getElementById(selectId, sList);
}

window.onload = function () {
    populateSelect("league", leaguelist);
};
