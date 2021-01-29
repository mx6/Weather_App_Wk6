$(document).ready (function(){


// cities button script
// let uvIndex = 0

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



$(document).on("click", ".city", function (event) {
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

  var queryParams = { "appid": "543832c704f98c368b007735d22e1b0c", "units": "imperial" };

  // Grab text the user typed into the search input, add to the queryParams object
  queryParams.q = $("#cityName")
    .val()
    .trim();

  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
};


// CLICK HANDLERS
// ==========================================================

$("#citySubmit").on("click", function (event) {
  event.preventDefault();
  
  var city = $("#cityName").val().trim();
  console.log("city what?")
  cityHistoryData(city);
  cities.push(city);
  renderButtons();
  console.log("city", city);


});



function cityHistoryData(city) {
  // var queryURL = buildQueryURL();
  let appid = "543832c704f98c368b007735d22e1b0c"
  var queryParams = { "appid": "543832c704f98c368b007735d22e1b0c", "units": "imperial" };
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=" + appid + "&q=" + city;


  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // getUvIndex(response.city.coord.lat, response.city.coord.lon)

    

    displayWeather(response);


  });
}

function getUvIndex(lat, lon) {
  let appid = "543832c704f98c368b007735d22e1b0c"
  let queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${appid}&lat=${lat}&lon=${lon}`
  
  // if (uvIndex < 5) {
  //   console.log("not so bright");
  //   var uvGreen = $("<img>").attr("src", "./uv_green.gif");
  // } else if (uvIndex < 10) {
  //   console.log("it bright");
  // } else (console.log("woah, too bright"));

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // uvIndexColor(response.value);
    let color = ""

  if (response.value < 5) {
    console.log("not so bright");
    color = "green";
  } else if (response.value < 10) {
    console.log("it bright");
    color = "yellow";
  } else {
    console.log("woah, too bright");
    color = "red";
    
  } 
  var weatherUVimage = $("<img>").attr("src", `./uv_${color}.gif`);
     $("body #one_day_UV").append(response.value);
     $("body #one_day_UV").append(weatherUVimage);
    console.log(response);
    // uvIndex = response.value;
  })

};

function uvIndexColor(uvIndex) {
  let color = ""

  if (uvIndex < 5) {
    console.log("not so bright");
    color = "green";
  } else if (uvIndex < 10) {
    console.log("it bright");
    color = "yellow";
  } else {
    console.log("woah, too bright");
    color = "red";
  }

  //  let img =  $("<img>")
  //  img.attr("src", `./uv_${color}.gif`);
  //   console.log(img);
  return color;
};

function displayWeather(response) {
  getUvIndex(response.city.coord.lat, response.city.coord.lon)
  // let color = uvIndexColor();
  var weatherCity = $("<h3>").text(response.city.name);
  var weatherDate = $("<p>").text(response.list[0].dt_txt);
  var weatherTemp = $("<li>").text(response.list[0].main.temp + " Degrees, F");
  var weatherHumidity = $("<li>").text(response.list[0].main.humidity + "% Humidity");
  var weatherWind = $("<li>").text("Wind at " + response.list[0].wind.speed + " MPH");
  var weatherImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
  var weatherUV = $("<div>").attr("id", "one_day_UV");
  // var weatherUVimage = $("<img>").attr("src", `./uv_${color}.gif`);
  $("#weatherData").html(weatherCity);
  $("#weatherData").append(weatherDate);
  $("#weatherData").append(weatherTemp);
  $("#weatherData").append(weatherHumidity);
  $("#weatherData").append(weatherWind);
  $("#weatherData").append(weatherImage);
  $("#weatherData").append(weatherUV);
  // $("#weatherData").append(weatherUVimage);
console.log(response);

  // five-day forecast

  var tBody = $("tbody");
  tBody.empty()
  var tRow = $("<tr>");
  var tColumn = $("<td>");
  var dayOneDate = $("<h5>").text(response.list[0].dt_txt);
  var dayOneTemp = $("<li>").text(response.list[0].main.temp + " Degrees, F");
  var dayOneHumidity = $("<li>").text(response.list[0].main.humidity + "% Humidity");
  var dayOneWind = $("<li>").text("Wind at " + response.list[0].wind.speed + " MPH");
  var dayOneImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
  tColumn.append(dayOneDate, dayOneTemp, dayOneHumidity, dayOneWind, dayOneImage);
  tRow.append(tColumn);
  tBody.append(tRow);

  var tBody = $("tbody");
  // var tRow = $("<tr>");
  var tColumn = $("<td>");
  var dayTwoDate = $("<h5>").text(response.list[8].dt_txt);
  var dayTwoTemp = $("<li>").text(response.list[8].main.temp + " Degrees, F");
  var dayTwoHumidity = $("<li>").text(response.list[8].main.humidity + "% Humidity");
  var dayTwoWind = $("<li>").text("Wind at " + response.list[8].wind.speed + " MPH");
  var dayTwoImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[8].weather[0].icon + "@2x.png");
  tColumn.append(dayTwoDate, dayTwoTemp, dayTwoHumidity, dayTwoWind, dayTwoImage);
  tRow.append(tColumn);
  // tBody.append(tRow);

  var tBody = $("tbody");
  // var tRow = $("<tr>");
  var tColumn = $("<td>");
  var dayThreeDate = $("<h5>").text(response.list[16].dt_txt);
  var dayThreeTemp = $("<li>").text(response.list[16].main.temp + " Degrees, F");
  var dayThreeHumidity = $("<li>").text(response.list[16].main.humidity + "% Humidity");
  var dayThreeWind = $("<li>").text("Wind at " + response.list[16].wind.speed + " MPH");
  var dayThreeImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[16].weather[0].icon + "@2x.png");
  tColumn.append(dayThreeDate, dayThreeTemp, dayThreeHumidity, dayThreeWind, dayThreeImage);
  tRow.append(tColumn);
  // tBody.append(tRow);

  var tBody = $("tbody");
  // var tRow = $("<tr>");
  var tColumn = $("<td>");
  var dayFourDate = $("<h5>").text(response.list[24].dt_txt);
  var dayFourTemp = $("<li>").text(response.list[24].main.temp + " Degrees, F");
  var dayFourHumidity = $("<li>").text(response.list[24].main.humidity + "% Humidity");
  var dayFourWind = $("<li>").text("Wind at " + response.list[24].wind.speed + " MPH");
  var dayFourImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[24].weather[0].icon + "@2x.png");
  tColumn.append(dayFourDate, dayFourTemp, dayFourHumidity, dayFourWind, dayFourImage);
  tRow.append(tColumn);
  // tBody.append(tRow);

  var tBody = $("tbody");
  // var tRow = $("<tr>");
  var tColumn = $("<td>");
  var dayFiveDate = $("<h5>").text(response.list[32].dt_txt);
  var dayFiveTemp = $("<li>").text(response.list[32].main.temp + " Degrees, F");
  var dayFiveHumidity = $("<li>").text(response.list[32].main.humidity + "% Humidity");
  var dayFiveWind = $("<li>").text("Wind at " + response.list[32].wind.speed + " MPH");
  var dayFiveImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[32].weather[0].icon + "@2x.png");
  tColumn.append(dayFiveDate, dayFiveTemp, dayFiveHumidity, dayFiveWind, dayFiveImage);
  tRow.append(tColumn);
  // tBody.append(tRow);
}
});
