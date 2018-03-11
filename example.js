
/* eslint no-console: 0 */

// SYNC EXAMPLES

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

document.getElementById("time").innerText = "Time for function " + time.averageTime + "ms";
document.getElementById("timeString").innerText = JSON.stringify(time, null, 4);
console.log("time", time);

var comparison = timer.compare([
	{
		id: "firstFunction", // Optional
		fn: first, 
		fnArgs: arg,
	}, 
	{   
		id: "secondFunction", // Optional
		fn: second, 
		fnArgs: arg,
	}
], 2);

document.getElementById("fastest").innerText = "When comparing, the fastest function was " +
	comparison.fastestId + " ran in " + comparison.fastestAverageTime + "ms";
document.getElementById("fastestString").innerText = JSON.stringify(comparison, null, 4);
console.log("comparison", comparison);


// ASYNC EXAMPLES

var firstAsync = function(input) { 

	return new Promise(function(resolve){
		// Synthetic wait
		var ms = input * (Math.random() * 1);
		var start = Date.now();
		var now = start;
		while (now - start < ms) {
			now = Date.now();
		}

		resolve ("finished");
	});
	

};

var secondAsync = function(input) { 

	return new Promise(function(resolve){
		// Synthetic wait
		const ms = input * (Math.random() * 1);
		const start = Date.now();
		let now = start;
		while (now - start < ms) {
			now = Date.now();
		}

		resolve ("finished");
	});

};

var comparisonAsync = timer.compareAsync([
	{
		id: "firstFunction", // Optional
		fn: firstAsync, 
		fnArgs: arg,
	}, 
	{   
		id: "secondFunction", // Optional
		fn: secondAsync, 
		fnArgs: arg,
	}
], 2);


var timeAsync = timer.timeAsync({
	fn: secondAsync, 
	fnArgs: arg,
}, 2);

timeAsync.then(function(result) {
	console.log("Async time result", result);
});

comparisonAsync.then(function(result) {
	console.log("Async compare result", result);
});

