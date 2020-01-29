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
    window.scrollTo(0,document.body.scrollHeight);
    
    
    localWeather(city, state, localDiv)
    forecast(city, state)
    saveCitySearch(city)
    $("#currentWeather").append(localDiv)
    $("#currentWeather").append(tomDescrip);
    breweries(city, state)
    searchCitiesInTown(city);
    $("#imageCity").empty();
    $("#breweryList").empty();

})

$("#state-input").keypress(function(event) {
    if (event.which == 13) {
      console.log("hi");
      event.preventDefault();
      var city = $("#city-input")
        .val()
        .trim();
      var state = $("#state-input")
        .val()
        .trim();
      var tomDescrip = "";
      var localDiv = $("#localDiv");
      window.scrollTo(0, document.body.scrollHeight);
      if (event.which == 13) {
        localWeather(city, state, localDiv);
        forecast(city, state);
        saveCitySearch(city);
        $("#currentWeather").append(localDiv);
        $("#currentWeather").append(tomDescrip);
        breweries(city, state);
        searchCitiesInTown(city);
        $("#imageCity").empty();
        $("#breweryList").empty();
      }
    }
  });





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







// pixabay api for images
function searchCitiesInTown(city) {
    var API_KEY = '14992449-1f5a79fc7605f2a9694e87a5b';
    
    var queryURL = "https://pixabay.com/api/?key="+ API_KEY + "&category=places" + "&image_type=photo" + "&q=" + city;


// Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
            })

        .then(function(response) {
    console.log(queryURL);
    console.log(response);

    for(var i=0; i<3; i++) {
    // Creating and storing an image tag
    var image = $("<img>").css({'width' : '700px' , 'height' : '400px'});

    // Setting the image src attribute to largeImageUrl
    image.attr("src", response.hits[i].largeImageURL);
    image.attr("alt", "city image");
    // $("#imageCity").empty();
    $("#imageCity").prepend(image);
    }
});
}







//open brwery api for breweries
function breweries(city, state) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + state,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com",
            "x-rapidapi-key": "e302f2241bmshe7c472e9ca95ff2p148a9djsn42ee28dfae96"
            }
        }
    
        $.ajax(settings).done(function(response) { 
        console.log(response);

            if (response.length === 0) {
                return
            }
        // for loop for breweries
        for (var i = 0; i < 5; i++) {
            console.log(i, response.length, response[i])
            var brewName = response[i].name
            var type = response[i].brewery_type
            var address = response[i].street + " " + response[i].city + ", " + response[i].state
            var number = response[i].phone
            var formattedPhone = formatPhone(number)

            var body = $("<div id='brewbox'>").html('<article class="tile is-child notification is-warning">' + '<h6 id="namesBody">' 
            + '<strong>Brewery: </strong>' + brewName + '</h6>'
            + '<div id="typeBody">' + '<strong>Type of Brewery: </strong>' + type + '</div>'
            + '<div id="addressBody">' + '<strong>Address: </strong>' + address + '</div>'
            + '<div id="numberBody">' + '<strong>Phone Number: </strong>' + formattedPhone + '</div>'
            + '</article>')
            $("#breweryList").append(body)
        }

        // reformat phone numbers from api
        function formatPhone(phonenum) {
            var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (regexObj.test(phonenum)) {
                var parts = phonenum.match(regexObj);
                var phone = "";
                if (parts[1]) { phone += "+1 (" + parts[1] + ") "; }
                phone += parts[2] + "-" + parts[3];
                return phone;
            }
            else {
                //invalid phone number
                return phonenum;
            }
        }
    })
}})