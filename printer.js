
//Printer functions: profile summary messages, error messages

//Print profile summary message
function printMessage(username, badgeCount, points) {
	var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript"; 
	console.log(message); 
}

//Print Error message
function printError(error, type) {
	//Add code to translate error.message to english
	arguments[1] === undefined? type = 'connection': type; 

	console.error('A ' + type + ' error occured. Error message: (' + error.message + ').');
}

exports.printMessage = printMessage; 
exports.printError = printError; 