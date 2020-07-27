const Parse = require('parse/node');

const APP_ID = "Jl21MbJjOzHoq3eNjK0dY1cuRyQnOeu1GNIGQpY3";
const JS_KEY = "Aqy19HFsorwxIhCC3E9IYBQh8WBnkdoMGOdEaYPe";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

module.exports = Parse;