
export default (() => {

    this.time = (fn, fnArgs, iterations) => {

        if (iterations === undefined) {
            iterations = 20;
        }

        if (!Array.isArray(fnArgs)) {
            throw Error("function arguments is not an array");
        }
        
        let totalTime = 0;

        for (let i = 0; i < iterations; i++) {
            const iterationTime = (()=> {
                const start = new Date();
                fn.apply(null, fnArgs);
                const end = new Date();
                return end - start;
            })();

            totalTime += iterationTime;
        } 

        return totalTime / iterations;
    
    },

    this.compare = (fnOne, fnArgs1, fnTwo, fnTwoArgs) => {
        const first = this.time(fnOne, fnArgs, 10);
        const second = this.time(fnOne, fnArgs, 10);
        return {
            faster: first < second,
            firstFnTime: first,
            secondFnTime: first,
            fastestTime: (first < second) ? first : second,
        };
    }

    return {
        compare: this.compare,
        time: this.time,
    }

})();