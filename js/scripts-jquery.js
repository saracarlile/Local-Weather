$(document).ready(function () {

  var city;
  var state;
  $.getJSON("https://freegeoip.net/json?callback=?", function (result) {
    //response data are now in the result variable
    $.each(result, function (key, val) {
      if (key === "city") {
        city = val;
      }
      if (key === "region_code") {
        state = val;
      }
    });
  }).done(function () {
    $.simpleWeather({
      location: city + ", " + state,
      woeid: '',
      unit: 'f',
      success: function (weather) {

        html = '<h2>' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
        html += '<img src="' + weather.image + '">';
        html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';
        html += '<li class="currently">' + weather.currently + '</li>';
        html += '<li>' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed + '</li></ul>';
        //  console.log(weather);

        $("#weather").html(html);
      },
      error: function (error) {
        $("#weather").html('<p>' + error + '</p>');
      }
    });
  });



});
