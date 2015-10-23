var https = require('https'); 
var http = require('http'); 
var printer = require('./printer'); 

//Print badge count and point tally
function get(username) {  
	//wrap all sections within functions to make them importable
	//Connect to the API URL (http://teamtreehouse.com/username.json)
	//Seems the protocol for json serving has switched from http to https
	var request = https.get("https://teamtreehouse.com/" + username + ".json", function (response) {
		var body = ''; 
		response.on('data', function(chunk) {  	
		// response is a stream of packets callback fcn is called when a chunk is ready to be worked on
			body += chunk;
		}) 									    
		response.on('end', function() {
			if(response.statusCode === 200) {
				try {
					//Parse data
					var profile = JSON.parse(body); 
					//Print message
					printer.printMessage(username, profile.badges.length, profile.points.JavaScript); 
				} catch(error) {
					//Parse Error
					printer.printError(error, 'parse'); 
				}
			} else {
				// statusCode Error
				printer.printError({message: "There was an error getting the profile for "+username +". ("+http.STATUS_CODES[response.statusCode] + ')'}, 'statusCode'); 
			}
		})
	})
	//Connection Error
	request.on('error', printer.printError); 
}; 

exports.get = get; 

// OR simply module.exports = get; 
