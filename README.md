# chronolite 🕰️

chronolite is a microlibrary for timing, comparing and benchmarking JavaScript functions. It supports both synchronous and asynchronous functions. Common use cases include performance benchmarking for a function, and benchmarking multiple functions against each other.

## Install

For npm:

``` npm install chronolite ```

For yarn: 

``` yarn add chronolite ```


## Usage

chronolite has 4 core methods:

* **time** - Return the running time of a synchronous function
* **timeAsync** - Return the running time of a async function (function must return a promise)
* **compare** - Find the fastest function out of an array of functions
* **compareAsync** - Find the fastest function out of an array of async functions

Methods take objects or arrays of objects of the following schema:

```javascript
    {
        id: "someFunction", // - string (optional) 
        binding: null // object (optional) - The object to bind the function to (defaults to null)
        fn: someFunc, // function 
        fnArgs: [1, 2, 3], // array - The array of arguments
    }
```

#### Synchronous Timing

Here is an example of using the synchronous time method:

```javascript 

    const timer = new chronolite();

    const fn = (input) => { 

        // Synthetic wait
        const ms = input * (Math.random() * 1);
        const start = Date.now();
        let now = start;
        while (now - start < ms) {
            now = Date.now();
        }

        return "finished";

    };

    const arg = [10];
    const iterations = 15;

    const time = timer.time({
        fn: first, 
        fnArgs: arg,
    }, iterations);

    console.log("Average time: ", time.averageTime);

```

#### Asynchronous Timing

Sometimes your code might be asynchronous and return a promise. Here is an example of using the synchronous time method:

```javascript 

    const timer = new chronolite();

    const asyncFn = function(input) { 

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

    const arg = [10];
    const iterations = 15;

    var timeAsync = timer.timeAsync({
        fn: secondAsync, 
        fnArgs: arg,
    }, iterations);

    timeAsync.then(function(result) {
         console.log("Average time: ", timeAsync.averageTime);
    });
   
```

## License
MIT 
