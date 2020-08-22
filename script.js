  
    // cities button script
    let uvIndex = 0
    var cities = [];
      function alertCityName() {
        var cityName = $(this).attr("data-name");
        alert(cityName);

      }

      function renderButtons() {

        $("#cityHistory").empty();
        for (var i = 0; i < cities.length; i++) {
          var a = $("<button>");
          a.addClass("city");
          a.attr("data-name", cities[i]);
          a.text(cities[i]);
          $("#cityHistory").append(a);
          
        }
      };

      $("#citySubmit").on("click", function(event) {
        event.preventDefault();
        var city = $("#cityName").val().trim();
        cities.push(city);
        renderButtons();
        console.log("city");
        
      });

      $(document).on("click", ".city", function(event) {
        event.preventDefault();
        let x = $(this).text()
        cityHistoryData(x);
      });

      renderButtons();
console.log("it works");




// weather API data script 

function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?";

  // http://api.openweathermap.org/data/2.5/weather?q=Portland&appid=[API-KEY-GOES-HERE]&units=imperial"

  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var queryParams = { "appid": "543832c704f98c368b007735d22e1b0c", "units" : "imperial" };

  // Grab text the user typed into the search input, add to the queryParams object
  queryParams.q = $("#cityName")
    .val()
    .trim();

  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}


// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#citySubmit").on("click", function(event) {
  event.preventDefault();
  var x = $("#cityName").val().trim();
  cityHistoryData(x);
});
// $("#citySubmit").on("click", cityHistoryData)
// $("#citySubmit").on("click", function(event) {

  // console.log("down by the ajax");
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  // event.preventDefault();

  // Empty the region associated with the articles
  // clear();

  // Build the query URL for the ajax request to the NYT API
//   var queryURL = buildQueryURL();

//   // Make the AJAX request to the API - GETs the JSON data at the queryURL.
//   // The data then gets passed as an argument to the updatePage function
//   console.log(queryURL);
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response){

//     console.log(response);
//     var weatherCity = $("<p>").text(response.city.name);
//     var weatherDate = $("<p>").text(response.list[0].dt_txt);
//     var weatherTemp = $("<li>").text(response.list[0].main.temp + " Degrees, F");
//     var weatherHumidity = $("<li>").text(response.list[0].main.humidity + " Units of Humidity");
//     var weatherWind = $("<li>").text(response.list[0].wind.speed + " MPH");
//     var weatherImage = $("<img>").attr("src", response.list[0].weather[0].icon);
//     $("#weatherData").html(weatherCity);
//     $("#weatherData").append(weatherDate);
//     $("#weatherData").append(weatherTemp);
//     $("#weatherData").append(weatherHumidity);
//     $("#weatherData").append(weatherWind);
//     $("#weatherData").append(weatherImage);

// // five-day forecast

//     var tBody = $("tbody");
//       var tRow = $("<tr>");
//       var dayOneTemp = $("<td>").text(response.list[0].main.temp + " Degrees, F");
//       var dayOneHumidity = $("<td>").text(response.list[0].main.humidity + " Units of Humidity");
//       var dayOneWind = $("<td>").text(response.list[0].wind.speed + " MPH");
//       tRow.append(dayOneTemp, dayOneHumidity, dayOneWind);
//       tBody.append(tRow);

//       var tBody = $("tbody");
//       var tRow = $("<tr>");
//       var dayTwoTemp = $("<td>").text(response.list[1].main.temp + " Degrees, F");
//       var dayTwoHumidity = $("<td>").text(response.list[1].main.humidity + " Units of Humidity");
//       var dayTwoWind = $("<td>").text(response.list[1].wind.speed + " MPH");
//       tRow.append(dayTwoTemp, dayTwoHumidity, dayTwoWind);
//       tBody.append(tRow);

//       var tBody = $("tbody");
//       var tRow = $("<tr>");
//       var dayThreeTemp = $("<td>").text(response.list[2].main.temp + " Degrees, F");
//       var dayThreeHumidity = $("<td>").text(response.list[2].main.humidity + " Units of Humidity");
//       var dayThreeWind = $("<td>").text(response.list[2].wind.speed + " MPH");
//       tRow.append(dayThreeTemp, dayThreeHumidity, dayThreeWind);
//       tBody.append(tRow);

//       var tBody = $("tbody");
//       var tRow = $("<tr>");
//       var dayFourTemp = $("<td>").text(response.list[3].main.temp + " Degrees, F");
//       var dayFourHumidity = $("<td>").text(response.list[3].main.humidity + " Units of Humidity");
//       var dayFourWind = $("<td>").text(response.list[3].wind.speed + " MPH");
//       tRow.append(dayFourTemp, dayFourHumidity, dayFourWind);
//       tBody.append(tRow);

//       var tBody = $("tbody");
//       var tRow = $("<tr>");
//       var dayFiveTemp = $("<td>").text(response.list[4].main.temp + " Degrees, F");
//       var dayFiveHumidity = $("<td>").text(response.list[4].main.humidity + " Units of Humidity");
//       var dayFiveWind = $("<td>").text(response.list[4].wind.speed + " MPH");
//       tRow.append(dayFiveTemp, dayFiveHumidity, dayFiveWind);
//       tBody.append(tRow);
    
//   });

// );

function cityHistoryData(city) {
  // var queryURL = buildQueryURL();
  let appid = "543832c704f98c368b007735d22e1b0c"
  var queryParams = { "appid": "543832c704f98c368b007735d22e1b0c", "units" : "imperial" };
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=" + appid + "&q=" + city;


  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    getUvIndex(response.city.coord.lat, response.city.coord.lon)
    console.log(response);

    var weatherCity = $("<p>").text(response.city.name);
    var weatherDate = $("<p>").text(response.list[0].dt_txt);
    var weatherTemp = $("<li>").text(response.list[0].main.temp + " Degrees, F");
    var weatherHumidity = $("<li>").text("Humidity " + response.list[0].main.humidity + "%");
    var weatherWind = $("<li>").text("Wind at " + response.list[0].wind.speed + " MPH");
    var weatherImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon+ "@2x.png");
    var weatherUV = $("<p>").text("UV Index: " + uvIndex);
    $("#weatherData").html(weatherCity);
    $("#weatherData").append(weatherDate);
    $("#weatherData").append(weatherTemp);
    $("#weatherData").append(weatherHumidity);
    $("#weatherData").append(weatherWind);
    $("#weatherData").append(weatherImage);
    $("#weatherData").append(weatherUV);

// five-day forecast

    var tBody = $("tbody");
      tBody.empty()
      var tRow = $("<tr>");
      var dayOneDate = $("<p>").text(response.list[0].dt_txt);
      var dayOneTemp = $("<td>").text(response.list[0].main.temp + " Degrees, F");
      var dayOneHumidity = $("<td>").text("Humidity " + response.list[0].main.humidity + "%");
      var dayOneWind = $("<td>").text("Wind at " + response.list[0].wind.speed + " MPH");
      var dayOneImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon+ "@2x.png");
      tRow.append(dayOneDate, dayOneTemp, dayOneHumidity, dayOneWind, dayOneImage);
      tBody.append(tRow);

      var tBody = $("tbody");
      var tRow = $("<tr>");
      var dayTwoDate = $("<p>").text(response.list[8].dt_txt);
      var dayTwoTemp = $("<td>").text(response.list[8].main.temp + " Degrees, F");
      var dayTwoHumidity = $("<td>").text("Humidity " + response.list[8].main.humidity + "%");
      var dayTwoWind = $("<td>").text("Wind at " + response.list[8].wind.speed + " MPH");
      var dayTwoImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[8].weather[0].icon+ "@2x.png");
      tRow.append(dayTwoDate, dayTwoTemp, dayTwoHumidity, dayTwoWind, dayTwoImage);
      tBody.append(tRow);

      var tBody = $("tbody");
      var tRow = $("<tr>");
      var dayThreeDate = $("<p>").text(response.list[16].dt_txt);
      var dayThreeTemp = $("<td>").text(response.list[16].main.temp + " Degrees, F");
      var dayThreeHumidity = $("<td>").text("Humidity " + response.list[16].main.humidity + "%");
      var dayThreeWind = $("<td>").text("Wind at " + response.list[16].wind.speed + " MPH");
      var dayThreeImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[16].weather[0].icon+ "@2x.png");
      tRow.append(dayThreeDate, dayThreeTemp, dayThreeHumidity, dayThreeWind, dayThreeImage);
      tBody.append(tRow);

      var tBody = $("tbody");
      var tRow = $("<tr>");
      var dayFourDate = $("<p>").text(response.list[24].dt_txt);
      var dayFourTemp = $("<td>").text(response.list[24].main.temp + " Degrees, F");
      var dayFourHumidity = $("<td>").text("Humidity " + response.list[24].main.humidity + "%");
      var dayFourWind = $("<td>").text("Wind at " + response.list[24].wind.speed + " MPH");
      var dayFourImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[24].weather[0].icon+ "@2x.png");
      tRow.append(dayFourDate, dayFourTemp, dayFourHumidity, dayFourWind, dayFourImage);
      tBody.append(tRow);

      var tBody = $("tbody");
      var tRow = $("<tr>");
      var dayFiveDate = $("<p>").text(response.list[32].dt_txt);
      var dayFiveTemp = $("<td>").text(response.list[32].main.temp + " Degrees, F");
      var dayFiveHumidity = $("<td>").text("Humidity " + response.list[32].main.humidity + "%");
      var dayFiveWind = $("<td>").text("Wind at " + response.list[32].wind.speed + " MPH");
      var dayFiveImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[32].weather[0].icon+ "@2x.png");
      tRow.append(dayFiveDate, dayFiveTemp, dayFiveHumidity, dayFiveWind, dayFiveImage);
      tBody.append(tRow);
    
  });
}



function getUvIndex(lat, lon){
  let appid = "543832c704f98c368b007735d22e1b0c"
  let queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${appid}&lat=${lat}&lon=${lon}`
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
  console.log(response);
  uvIndex = response.value;
})


  
  

};
