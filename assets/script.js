var API_KEY = '14992449-1f5a79fc7605f2a9694e87a5b';
var queryURL = "https://pixabay.com/api/?key="+ API_KEY;


 // Event listener for our cat-button
//  $("#cat-button").on("click", function() {

 // Storing our giphy API URL for a random cat image

  
// Perfoming an AJAX GET request to our queryURL
$.ajax({
    url: queryURL,
    method: "GET"
        })
  .then(function(response) {
console.log(queryURL);
console.log(response);
console.log(response.hits[0].largeImageURL)

});


// // Retrieving the URL for the image
// var imgURL = response.Poster;

// // Creating an element to hold the image
// var image = $("<img>").attr("src", imgURL);

// // Appending the image
// movieDiv.append(image);