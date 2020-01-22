$(document).ready(function(){
    var weatherCalls = "https://api.weatherbit.io/v2.0/subscription/usage?key=" + weatherAPI
    var weatherAPI = "d6e8ffe90ebe474fa1ad37347201fc11"


$("#citySearch").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();

    localWeather(city)
    forecast(city)
})

    function localWeather(city) {
        var queryURL = "https://api.weatherbit.io/v2.0/current?city=" + city + "&key=" + weatherAPI;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)

        var showIcon = "https://www.weatherbit.io/static/img/icons/" + response.data[0].weather.icon + ".png";
        var cityName = $("#cityTitle").text(response.data[0].city_name + ", " + response.data[0].state_code);
            $("#currentWeather").append(cityName);
        var cityDate = $("#cityDate").text(response.data[0].datetime);
        $("#currentWeather").append(cityDate);
        var cityIcon = $("#cityIcon").html('<img src="' + showIcon + '"/>');
            $("#currentWeather").append(cityIcon);
        var description = $("#description").text("Conditions: " + response.data[0].weather.description)
            $("#currentWeather").append(description);
        var temp = $("#temp").text("Temperature: " + response.data[0].temp)
            $("#currentWeather").append(temp);
        
    })
    }

    function forecast(city) {
        var queryURL = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&key=" + weatherAPI;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)

        var tomDescrip = $("#tomDescrip").text("Tomorrow's forecast: " + response.data[1].weather.description)
            $("#currentWeather").append(tomDescrip);
    })
    }



})

