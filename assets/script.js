$(document).ready(function(){

    var weatherAPI = "d6e8ffe90ebe474fa1ad37347201fc11"
    var cityArr = [];



// BUTTON FUNCTIONS
// when user types a city the the weather conditions show
$("#citySearch").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    var state = $("#state-input").val().trim();
    var tomDescrip = ""
    var localDiv = $("#localDiv")
    localWeather(city, state, localDiv)
    forecast(city, state)
    saveCitySearch(city)
    $("currentWeather").append(localDiv)
    $("#currentWeather").append(tomDescrip);
})

// saving to local storage 
function saveCitySearch(city) {
    cityArr.push(city.toLowerCase());
    localStorage.setItem("city", JSON.stringify(cityArr));
}




// WEATHER APIs
// Elements that makeup current weather conditions
function localWeather(city, state, localDiv) {
        var queryURL = "https://api.weatherbit.io/v2.0/current?city=" + city + "&state=" + state + "&key=" + weatherAPI;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)

        // pulling their icons based on the weather conditions
        var showIcon = "https://www.weatherbit.io/static/img/icons/" + response.data[0].weather.icon + ".png";
        // converting the temperature from celsius to fahrenheit
        var temperature = response.data[0].temp * 9/5 + 32.
        // rounding the temperature to get rid of decimals
        var conTemp = temperature.toFixed(0)


        var cityName = $("#cityTitle").text(response.data[0].city_name + ", " + response.data[0].state_code + " " + "(" + moment().format("MM-DD-YYYY") + ")");
            localDiv.append(cityName);
        var cityIcon = $("#cityIcon").html('<img src="' + showIcon + '"/>');
            localDiv.append(cityIcon);
        var description = $("#description").text("Conditions: " + response.data[0].weather.description)
            localDiv.append(description);
        var temp = $("#temp").text("Temperature: " + conTemp + " °F")
            localDiv.append(temp);  
        })
    }


// element that predicts tomorrows forecast 
   function forecast(city, state) {
        var queryURL = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&state=" + state + "&key=" + weatherAPI;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)

        // getting tomorrows weather forecast description 
       tomDescrip = $("#tomDescrip").text("Tomorrow's forecast: " + response.data[1].weather.description)
        })
    }
})