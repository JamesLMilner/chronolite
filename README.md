# chronolite

## Install

For npm:

``` npm install chronolite ```

For yarn: 

``` yarn add chronolite ```


## Usage

chronolite has 4 core methods:

* **time** - Timing of a synchronous function
* **timeAsync** - Timing of a async function (must return a promise)
* **compare** - Find the fastest function out of an array
* **compareAsync** - Find the fastest function out of an array of functions

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