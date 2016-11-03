$(document).ready(function () {

  var city;
  var state;

  function changeTemp() {  //toggle farenheit to celcius
    var units = document.getElementById('temp-unit').textContent;
    var tempNum = document.getElementById('temp-num').textContent;
    document.getElementById('temp').textContent = "";
    console.log(units);
    console.log(tempNum);
    if (units === "F") {
      $('#temp').html('<span id="temp-num">' + Math.round((tempNum - 32) / 1.8) + '</span>&deg;<span id="temp-unit">' + 'C</span>');
    }
    if (units === "C") {
      $('#temp').html('<span id="temp-num">' + Math.round((tempNum * 1.8) + 32) + '</span>&deg;<span id="temp-unit">' + 'F</span>');
    }
  }


  $.getJSON('https://freegeoip.net/json?callback=?', function (result) {  //request geolocation info
    //response data now in the result variable
    $.each(result, function (key, val) {
      if (key === 'city') {
        city = val;
      }
      if (key === 'region_code') {
        state = val;
      }
    });
  }).done(function () {   //simpleWeather jQuery plugin call to get weather from location
    $.simpleWeather({
      location: city + ', ' + state,
      woeid: '',
      unit: 'f',
      success: function (weather) {
        $('#loading').remove();
        var gridOne = $('#grid-one');
        gridOne.append('<p><img src="' + weather.image + '"></p>').append('<h2 class="fix">' + weather.city + ', ' + weather.region + '</h2>');

        var gridTwo = $('#grid-two');
        gridTwo.append().append('<h2 id="temp">' + '<span id="temp-num">' + weather.temp + '</span>' + '&deg;' + '<span id="temp-unit">' + weather.units.temp + '</span></h2>').append('<p>' + weather.currently + '</p>').append('<p>Wind: ' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed + '</p>');
      },
      error: function (error) {
        $("#weather").html('<p>' + error + '</p>');
      }
    });
  });


  $('.page-content').on('DOMNodeInserted', function (e) {
    if ($(e.target).is('#temp')) {
      var elm = document.getElementById('temp').addEventListener('click', changeTemp, false);
    }
  });


});
