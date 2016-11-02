$(document).ready(function() {


var city;
var state;
$.getJSON("https://freegeoip.net/json?callback=?", function(result){
   //response data are now in the result variable
   $.each(result, function (key, val){
     console.log( key + "," + val);
     if(key === "city"){
       console.log("CITY " + val);
       city = val;
     }
     if(key === "region_code"){
       console.log("state " + val);
       state = val;
     }
   });
}).done(function() {
    console.log("RRRRRR " + city + ", " + state);
  }).done(function(){
    console.log("Can I do this?");
     $.simpleWeather({
    location: city + ", " + state,
    woeid: '',
    unit: 'f',
    success: function(weather) {
      
      html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<img src="' + weather.image + '">';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
    //  console.log(weather);
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
  });






// http://stackoverflow.com/questions/5943630/basic-example-of-using-ajax-with-jsonp

 
});
