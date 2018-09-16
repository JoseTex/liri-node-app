require("dotenv").config();
var fs = require("fs");
var request = require('request');
var spotify = require('node-spotify-api');
var moment = require('moment');

var random = require("./random.txt");
var keys = require("./keys.js");

var arg2 = process.argv[2];
var arg3 = process.argv[3];
var runSpotify = new spotify(keys.spotify);

//Testing Spotify functionality
//console.log("got here 1")
//runSpotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//    if (err) {
//        console.log("got here 2")
//      return console.log('Error occurred: ' + err);    
//    } 
//  console.log("got here 3");
//  console.log(data); 
//  });

//for (var i = 2; i < nodeArgs.length; i++) {
//  if (i > 2 && i < nodeArgs.length) {
//    movieName = movieName + "+" + nodeArgs[i];
//  }
//  else {
//    movieName += nodeArgs[i];
//  }
//}
//End Test


//Creating a switch statement to allow the user to choose whichever function/API they would like to call. 
//console.log("waiting for input");
switch(arg2){

  case "concert-this":
    console.log("concert-hit");
    conCert(arg3);
    break;

  case "spotify-this-song":
    console.log("spot-hit");
    spotSearch(arg3);
    break;

  case "movie-this":
    console.log("movie-hit");
    movieSearch(arg3);
    break;

  case "do-what-it-says":
    console.log("do-stuff");
    doThis();
    break;
}


//Build Out functions for all of the API Calls. 

//CONCERT Function 
function conCert (artist) {
  var bandsLink = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  request(bandsLink, function(error, response, body){
  if(!error && response.statusCode === 200){

    var artist = JSON.parse(body);
    //console.log(artist);
    //* Name of the venue
    console.log("");
    console.log("***Venue Name***");
    console.log("");
    //console.log(artist[0].venue);
    for(i=0; i<artist.length; i++){
      console.log(artist[i].venue.name)};

    //* Venue Location
    console.log("");
    console.log("***Venue Location***");
    console.log("");
    for(i=0; i<artist.length; i++){
    console.log(artist[i].venue.city, artist[i].venue.reigon, artist[i].venue.country)};

    //* Date of the Event (use moment to format this as "MM/DD/YYYY")
    console.log("");
    console.log("***Event Date***");
    console.log("");
    function date(date) {for(i=0; i<artist.length; i++){
      var momentDate = artist[i].datetime
      console.log(moment(momentDate).format("LLLL")); 
    };}
    date();
    }
  });
}





//SPOTIFY Function
function spotSearch(track){

  //Derived from the Spotify npm readme file. 
  runSpotify.search({ type: "track", query: track, limit: 20 }, function(err, data) {
    
    if (err) {
      return console.log("Broken: " + err);
    }

    var track = data.tracks.items[0];
    
    //* Artist(s)
    console.log("");
    console.log("***Artist Name***");
    console.log("");
    for(i=0; i<track.artists.length; i++){
    console.log(track.artists[i].name);
     
    //* The song's name   
    console.log("");
    console.log("***Track Name***");
    console.log("");
    console.log(track.name);
    
    //* A preview link of the song from Spotify
    console.log("");
    console.log("***Album Name***");
    console.log("");
    console.log(track.album.name);

    //* The album that the song is from
    console.log("");
    console.log("***URL***");
    console.log("");
    console.log(track.preview_url);
    console.log("");

    }
  //console.log("got here finally!"); 
  });
}


//OMDB Function
function movieSearch(movie){
  var omdbLink = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  request(omdbLink, function(error, response, body){
    if(!movie){
      movie = "Mr. Nobody";
      console.log("If you haven't watched " + "Mr. Nobody," + "then you should!:" + "<http://www.imdb.com/title/tt0485947/");
    }
    //Error & Status Code Controll I Found on Stack Overflow
    if(!error && response.statusCode === 200){

      var movie = JSON.parse(body);

      //* Title of the movie.
      console.log("");
      console.log("***Movie Title***");
      console.log("");
      console.log(movie.Title);
 

      //* Year the movie came out.
      console.log("");
      console.log("***Release Year***");
      console.log("");
      console.log(movie.Year);


      //* IMDB Rating of the movie.
      console.log("");
      console.log("***IMDB Rating***");
      console.log("");
      console.log(movie.imdbRating);


      //* Rotten Tomatoes Rating of the movie.
      console.log("");
      console.log("***Rotten Tomatoes Rating***");
      console.log("");
      console.log(movie.Ratings[1].Value);


      //* Country where the movie was produced.
      console.log("");
      console.log("***Country Origin***");
      console.log("");
      console.log(movie.Country);


      //* Language of the movie.
      console.log("");
      console.log("***Language***");
      console.log("");
      console.log(movie.Language);


      //* Plot of the movie.
      console.log("");
      console.log("***Movie Plot***");
      console.log("");
      console.log(movie.Plot);


      //* Actors in the movie.
      console.log("");
      console.log("***Actors List***");
      console.log("");
      console.log(movie.Actors);
      console.log("");

    }
  })

}

//Do What It Says Function 
//Didnt have time to work in the command calls from the file so I made it so each number in the array would have a different command executed. 
function doThis(){
  fs.readFile("random.txt", "utf8", function(err, data) {
    
    if(err){
      console.log(err);
    }
  //console.log(data);

  var readOut = data.split(",");
   spotSearch(readOut[0]);
   movieSearch(readOut[1]);
   conCert(readOut[2]);
  
  });
}