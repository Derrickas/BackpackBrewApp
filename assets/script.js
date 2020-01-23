var API_KEY = '14992449-1f5a79fc7605f2a9694e87a5b';
var queryURL = "https://pixabay.com/api/?key="+ API_KEY;


 // Event listener for our button
 $(".button").on("click", function() {

// Perfoming an AJAX GET request to our queryURL
$.ajax({
    url: queryURL,
    method: "GET"
        })

    .then(function(response) {
console.log(queryURL);
console.log(response);
console.log(response.hits[0].largeImageURL)




// Creating and storing an image tag
var image = $("<img>");

// Setting the image src attribute to imageUrl
  image.attr("src", response.hits[0].largeImageURL);
  image.attr("alt", "city image");

  $("#imageCity").prepend(image);

});
});