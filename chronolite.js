module.exports = class chronolite {

	constructor() {
		this.defaultIterations = 20;
	}

	validInput(obj) {

		const objStr = JSON.stringify(obj);
		if (obj === undefined) {
			return [false, "passed object is undefined: " + objStr];
		}
		if (typeof obj.fn !== "function") {
			return [false, "function (fn) is not a function type: " + objStr];
		}
		if (obj.fnArgs !== undefined && !Array.isArray(obj.fnArgs)) {
			return [false, "function args (fnArgs) is not an array: " + objStr];
		}
		if (obj.binding !== undefined && typeof obj.binding !== "object") {
			return [false, "binding is defined but not an object (got " +
					typeof obj + ") with value: " + objStr];
		}
		return [true, ""];

	}

	// Time code
	_setup(fnToTime) {
		const valid = this.validInput(fnToTime);

		if (!valid[0]) {
			throw Error(valid[1]);
		}
		
		fnToTime.binding = (fnToTime.binding === undefined) ? null : fnToTime.binding;
	}

	_emptyTimeResult() {
		return {
			totalTime: 0,
			averageTime: Infinity,
			fastestTime: Infinity,
			slowestTime: -Infinity,
		};
	}

	_compareTimes(iterationTime, result) {
		if (iterationTime < result.fastestTime) {
			result.fastestTime = iterationTime;
		}
		if (iterationTime > result.slowestTime) {
			result.slowestTime = iterationTime;
		}

		result.totalTime += iterationTime;
	}

	time(fnToTime, iterations) {

		iterations = iterations || this.defaultIterations;
		this._setup(fnToTime);
		const result = this._emptyTimeResult();

		for (let i = 0; i < iterations; i++) {

			const start = new Date();
			fnToTime.fn.apply(fnToTime.binding, fnToTime.fnArgs);
			const end = new Date();

			const iterationTime = end - start;
			this._compareTimes(iterationTime, result);

		}

		result.averageTime = result.totalTime / iterations;

		return result;

	}

	async timeAsync(fnToTime, iterations) {
		
		iterations = iterations || this.defaultIterations;
		this._setup(fnToTime);
		const result = this._emptyTimeResult();

		for (let i = 0; i < iterations; i++) {

			const start = new Date();
			await fnToTime.fn.apply(fnToTime.binding, fnToTime.fnArgs);
			const end = new Date();

			const iterationTime = end - start;
			this._compareTimes(iterationTime, result);

		}

		result.averageTime = result.totalTime / iterations;

		return result;
	
	}

	// Comparison Code

	_handleComparison(time, result, index, objId) {
		time.id = objId;
		if (time.averageTime < result.fastestAverageTime) {
			result.fastestIndex = index;
			result.fastestId = time.id;
			result.fastestAverageTime = time.averageTime;
		}
		result.timeTaken[index] = time;
	}

	_emptyCompareResult() {
		return {
			fastestIndex: undefined,
			fastestId: undefined,
			fastestAverageTime: Infinity,
			timeTaken: [],
		};
	}

	compare(fnsToCompare, iterations) {
		
		iterations = iterations || this.defaultIterations;
		const result = this._emptyCompareResult();
	
		for (let i =0; i < fnsToCompare.length; i++) {
			const fnObj = fnsToCompare[i];
			const time = this.time(fnObj, iterations);
			this._handleComparison(time, result, i, fnObj.id);
		}

		if (result.fastestId === undefined) delete result.fastestId;

		return result;

	}

	async compareAsync(fnsToCompare, iterations) {

		iterations = iterations || this.defaultIterations;
		const result = this._emptyCompareResult();
	
		for (let i = 0; i < fnsToCompare.length; i++) {
			const fnObj = fnsToCompare[i];
			const time = await this.timeAsync(fnObj, iterations);
			this._handleComparison(time, result, i, fnObj.id);
		}

		if (result.fastestId === undefined) delete result.fastestId;

		return result;

	}

};