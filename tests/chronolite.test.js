const chronolite = require("./../chronolite.js");

const timer = new chronolite();

const syntheticWait = (wait) => {
	const ms = wait;
	const start = Date.now();
	let now = start;
	while (now - start < ms) {
		now = Date.now();
	}
};

const first = () => { syntheticWait(10); };

const second = () => {  syntheticWait(20); };

const firstAsync = () => { 
	return new Promise((resolve) => {
		resolve(first());
	});
};

const secondAsync = () => { 
	return new Promise((resolve) => {
		resolve(second());
	});
};


test("reject invalid input: undefined", () => {
	const validate = timer.validInput(undefined);
	expect(Array.isArray(validate)).toBe(true);
	expect(validate[0]).toBe(false);
	expect(validate[1]).not.toBe("");
});

test("reject invalid input: object with no properties", () => {
	const validate = timer.validInput({});
	expect(Array.isArray(validate)).toBe(true);
	expect(validate[0]).toBe(false);
	expect(validate[1]).not.toBe("");

});

test("reject invalid input: object with none array function arguments", () => {
	const validate = timer.validInput({
		fn: () => {},
		fnArgs: "nonsense",
	});
	expect(Array.isArray(validate)).toBe(true);
	expect(validate[0]).toBe(false);
	expect(validate[1]).not.toBe("");
});

test("reject invalid input: object with none array function arguments", () => {
	const validate = timer.validInput({
		fn: () => {},
		binding: "nonsense",		
	});

	expect(Array.isArray(validate)).toBe(true);
	expect(validate[0]).toBe(false);
	expect(validate[1]).not.toBe("");
});



test("accept valid input: just function", () => {
	const validate = timer.validInput({
		fn: () => {}, 
	});
});

test("accept valid input: no binding", () => {
	const validate = timer.validInput({
		fn: () => {}, 
		fnArgs: [],
	});
	expect(Array.isArray(validate)).toBe(true);
	expect(validate[0]).toBe(true);
	expect(validate[1]).toBe("");
});

test("accept valid input: binding", () => {
	const validate = timer.validInput({
		fn: () => {}, 
		fnArgs: [],
		binding: {}
	});
	expect(Array.isArray(validate)).toBe(true);
	expect(validate[1]).toBe("");
});

test("_setup makes binding null if undefined", () => {
	const ref = {
		fn: () => {}, 
	};
	timer._setup(ref);
	expect(ref.binding).toBe(null);
});


test("_setup uses passed binding if defined", () => {
	const ref = {
		fn: () => {}, 
		binding: this
	};
	timer._setup(ref);
	expect(ref.binding).toBe(this);
});


test("_setup throws if validation fails", () => {
	expect(() => {
		timer._setup({
			fn: null, 
		});
	}).toThrow();
});


test("_emptyTimeResult returns an empty result", () => {
	const empty = timer._emptyTimeResult();
	expect(empty.totalTime).toBe(0),
	expect(empty.averageTime).toBe(Infinity);
	expect(empty.fastestTime).toBe(Infinity);
	expect(empty.slowestTime).toBe(-Infinity);
});

test("_compareTime sets the fastest time correctly", () => {
	const ref = {
		fastestTime : 2,
		slowestTime : 10,
		totalTime : 0,
	};
	timer._compareTimes(1, ref);
	expect(ref.fastestTime).toBe(1);
});

test("_compareTime sets the slowest time correctly", () => {
	const ref = {
		fastestTime : 2,
		slowestTime : 10,
		totalTime : 0,
	};
	timer._compareTimes(11, ref);
	expect(ref.slowestTime).toBe(11);
});

test("_compareTime sets the total time correctly", () => {
	const ref = {
		fastestTime : 2,
		slowestTime : 10,
		totalTime : 100,
	};
	timer._compareTimes(20, ref);
	expect(ref.totalTime).toBe(120);
});

test("time function returns sensible results", () => {
	
	var arg = [10];

	var time = timer.time({
		fn: first, 
		fnArgs: arg,
	}, 2);

	expect(time.totalTime).toBeGreaterThan(19);
	expect(time.fastestTime).toBeCloseTo(10);
	expect(time.slowestTime).toBeCloseTo(10);
});

test("time function should use default iterations if not passed", () => {
	
	expect(() => {
		timer.time({
			fn: first, 
			fnArgs: [],
		});
	}).not.toThrow();

});


test("timeAsync function returns sensible results", (done) => {
	
	var arg = [10];

	timer.timeAsync({
		fn: firstAsync, 
		fnArgs: arg,
	}, 2).then((time) => {
		expect(time.totalTime).toBeGreaterThan(19);
		expect(time.fastestTime).toBeGreaterThan(9);
		expect(time.slowestTime).toBeGreaterThan(9);
		done();
	});
	
});


test("timeAsync function should use default iterations if not passed", () => {
	
	expect(() => {
		timer.timeAsync({
			fn: firstAsync, 
			fnArgs: [],
		});
	}).not.toThrow();

});


test("_handleComparison should compare", () => {

	const result = {
		fastestAverageTime : 10,
		fastestId : "First",
		fastestIndex: 0,
		timeTaken: [{}]
	};

	const time = {
		averageTime : 5,
	};

	timer._handleComparison(time, result, 0, "Second");

	expect(result.fastestId).toBe("Second");
	expect(result.fastestAverageTime).toBe(5);

});

test("compare should return sensible results for function comparisions", () => {

	const comparison = timer.compare([
		{
			id: "firstFunction", // Optional
			fn: first, 
			fnArgs: [],
		}, 
		{   
			id: "secondFunction", // Optional
			fn: second, 
			fnArgs: [],
		}
	], 2);

	expect(comparison.fastestIndex).not.toBe(undefined);
	expect(comparison.fastestId).not.toBe(undefined);
	expect(comparison.fastestAverageTime).not.toBe(Infinity);
	expect(Array.isArray(comparison.timeTaken)).toBe(true);

	expect(comparison.fastestIndex).toBe(0);
	expect(comparison.fastestId).toBe("firstFunction");
	expect(comparison.fastestAverageTime).toBeCloseTo(10);
	expect(comparison.timeTaken.length).toBe(2);

});

test("compare should delete ids when they're not passed in", () => {

	const comparison = timer.compare([
		{
			fn: first, 
			fnArgs: [],
		}, 
		{   
			fn: second, 
			fnArgs: [],
		}
	], 2);

	expect(comparison.hasOwnProperty("fastestId")).toBe(false);
});


test("compare should run with default iterations if none passed", () => {

	expect(() => {
		timer.compare([
			{
				fn: first, 
				fnArgs: [],
			}, 
			{   
				fn: second, 
				fnArgs: [],
			}
		]);
	}).not.toThrow();

});


test("compareAsync should return sensible results for function comparisions", (done) => {
	
	var comparisonAsync = timer.compareAsync([
		{
			id: "firstFunction", // Optional
			fn: firstAsync, 
			fnArgs: [],
		}, 
		{   
			id: "secondFunction", // Optional
			fn: secondAsync, 
			fnArgs: []
		}
	], 2);
	
	comparisonAsync.then((comparison) => {
			
		expect(comparison.fastestIndex).not.toBe(undefined);
		expect(comparison.fastestId).not.toBe(undefined);
		expect(comparison.fastestAverageTime).not.toBe(Infinity);
		expect(Array.isArray(comparison.timeTaken)).toBe(true);

		expect(comparison.fastestIndex).toBe(0);
		expect(comparison.fastestId).toBe("firstFunction");
		expect(comparison.fastestAverageTime).toBeCloseTo(10);
		expect(comparison.timeTaken.length).toBe(2);

		done();

	});

});


test("compare should run with default iterations if none passed", (done) => {

	expect(() => {
		timer.compareAsync([
			{
				fn: firstAsync, 
				fnArgs: [],
			}, 
			{   
				fn: secondAsync, 
				fnArgs: [],
			}
		]).then(() => {
			done();
		});
	}).not.toThrow();

});


