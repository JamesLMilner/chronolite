# chronolite

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
        fnArgs: [1, 2, 3], // array - The array of o
    }
```

Here is an example of using the time method:

```javascript 

    var timer = new chronolite();

    var fn = function(input) { 

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
    var iterations = 15;

    var time = timer.time({
        fn: first, 
        fnArgs: arg,
    }, iterations);

    console.log("time", time.averageTime);

```

## License
MIT 