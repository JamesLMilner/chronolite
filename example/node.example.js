const chronolite = require("./dist/chronolite.umd.js");

var timer = new chronolite();

var first = function(input) { 

	// Synthetic wait
	const ms = input * (Math.random() * 1);
	const start = Date.now();
	let now = start;
	while (now - start < ms) {
		now = Date.now();
	}

	return "finished";

};

var second = function(input) { 

	// Synthetic wait
	const ms = input * (Math.random() * 1);
	const start = Date.now();
	let now = start;
	while (now - start < ms) {
		now = Date.now();
	}

	return "finished";

};

var arg = [10];

var time = timer.time({
	fn: first, 
	fnArgs: arg,
}, 2);


console.log(time);