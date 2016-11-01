var app = angular.module('localWeather', []);



app.controller('weatherController', function ($scope, $http) {



    $http.jsonp("https://freegeoip.net/json?callback=JSON_CALLBACK").
        success(function (data) {
            console.log(data);
        }).
        error(function (data) {
            console.log("Request failed");
        });


});



