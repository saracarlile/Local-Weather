$(document).ready(function () {

  var city;
  var state;
  $.getJSON('https://freegeoip.net/json?callback=?', function (result) {
    //response data are now in the result variable
    $.each(result, function (key, val) {
      if (key === 'city') {
        city = val;
      }
      if (key === 'region_code') {
        state = val;
      }
    });
  }).done(function () {
    $.simpleWeather({
      location: city + ', ' + state,
      woeid: '',
      unit: 'f',
      success: function (weather) {
        $('#loading').remove();
        var gridOne = $('#grid-one');
        gridOne.append('<p><img src="' + weather.image + '"></p>').append( '<h2 class="fix">' + weather.city + ', ' + weather.region + '</h2>');

         var gridTwo = $('#grid-two');
          gridTwo.append().append( '<h2>' + weather.temp + '&deg;' + weather.units.temp + '</h2>').append('<p>' +  weather.currently + '</p>').append('<p>Wind: ' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed + '</p>');

        //  console.log(weather);
      },
      error: function (error) {
        $("#weather").html('<p>' + error + '</p>');
      }
    });
  });



});
