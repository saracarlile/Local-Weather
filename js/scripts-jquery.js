$(document).ready(function() {

 var location =  $.getJSON("https://freegeoip.net/json?callback=?", function(result){
   //response data are now in the result variable
  console.log(result);
  $.each( result, function( key, val ) {
    console.log(key + ", " + val);
  });
 
});

console.log(location);
// http://stackoverflow.com/questions/5943630/basic-example-of-using-ajax-with-jsonp

  $.simpleWeather({
    location: 'Austin, TX',
    woeid: '',
    unit: 'f',
    success: function(weather) {
      
      html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<img src="' + weather.image + '">';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
      console.log(weather);
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});
