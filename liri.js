//store dependencies as variables.
var twitterKeys = require('./keys.js');
var spotifyKeys = require('./keys.js');
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require('fs');
var media = process.argv[3];

//capture user input, and inform user of what to type in.
console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says");
//process[2] choses action, process[3] as search parameter for spotify or movie.
var userCommand = process.argv[2];
var secondCommand = process.argv[3];
//process multiple words. Triggers if user types anything more than the above console logged options and first parameter.
	for(i=4; i<process.argv.length; i++){
	    secondCommand += '+' + process.argv[i];
	}

function theMainSwitch(){
	//action statement, switch statement to declare what action to execute.
	switch(userCommand){

		case 'my-tweets':
		getTweets();
		break;

		case 'spotify-this-song':
		mySpotify();
		break;

		case 'movie-this':
		myMovie();
		break;

		case 'do-what-it-says':
		readTheManual();
		break;

	}
};
//functions/options
function getTweets(){
	console.log("Here come the Tweets!");
	//new variable for instance of twitter, load keys from imported keys.js
	var client = new twitter({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
	});

	//parameters for twitter function.
	var parameters = {
		screen_name: 'blbaker89',
		count: 20
	};

	//call the get method on our client variable twitter instance
	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
	        for (i=0; i<tweets.length; i++) {
	            var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnedData);
	            console.log("-------------------------");
	        }
	    };
	});
};//end getTweets;

function mySpotify(){
	console.log("All the Music!");
//
// variable for search term, test if defined.

var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//   id: "c359cc76bff043b98967e967588ff790",
//   secret: "d88200664d004b9da1b17b8d36fbf00c"
// });

 spotify.search({ type: 'track', query: 'media' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });




//
//  function mySpotify(song) {
//
//     if (song === undefined) {
//       song = 'What\'s my age again';
//     };
//   //  fs.appendFile('random.txt', ", " + media);
//    spotify.search({
//      type: 'track',
//      query: song
//    }, function(err, data) {
//        if (err) {
//          console.log('Error occurred: ' + err);
//          return;
//        }
    //    var songs = data.tracks;
    //    var data = [];
    //
    //    for (var i = 0; i < songs.length; i++) {
    //      data.push({
    //     'artist(s)': songs[i].artists.map(getArtistNames),
    //     'song name: ': songs[i].name,
    //     'preview song: ': songs[i].preview_url,
    //     'album: ': songs[i].album.name,
    //   });
    // }

    console.log(media);



};


function myMovie(){
	console.log("Netflix and Chill?");

	//same as above, test if search term entered
	var searchMovie;
	if(secondCommand === undefined){
		searchMovie = "Mr. Nobody";
	}else{
		searchMovie = secondCommand;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=short&apikey=40e9cece';
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
	        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
	    }
    });
};//end myMovie

function readTheManual(){
	console.log("Looking at random.txt now");
	fs.readFile("random.txt", "utf8", function(error, data) {
	    if(error){
     		console.log(error);
     	}else{

     	//split data, declare variables
     	var dataArr = data.split(',');
        userCommand = dataArr[0];
        secondCommand = dataArr[1];
        //if multi-word search term, add.
        for(i=2; i<dataArr.length; i++){
            secondCommand = secondCommand + "+" + dataArr[i];
        };
        //run action
		theMainSwitch();

    	};//end else

    });//end readfile

};//end readTheManual

theMainSwitch();
