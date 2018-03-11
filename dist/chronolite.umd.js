!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.chronolite=e()}(this,function(){var t=function(){this.defaultIterations=20};return t.prototype.validInput=function(t){var e=JSON.stringify(t);return void 0===t?[!1,"passed object is undefined: "+e]:void 0===t.fn?[!1,"function (fn) is undefined: "+e]:void 0===t.fnArgs||Array.isArray(t.fnArgs)?void 0!==t.binding&&typeof t.binding!==t?[!1,"binding is defined but not an object : "+e]:[!0,""]:[!1,"function args (fnArgs) is not an array: "+e]},t.prototype._setup=function(t){var e=this.validInput(t);if(!e[0])throw Error(e[1]);t.binding=void 0===t.binding?null:t.binding},t.prototype._emptyTimeResult=function(){return{totalTime:0,averageTime:Infinity,fastestTime:Infinity,slowestTime:-Infinity}},t.prototype._compareTimes=function(t,e){t<e.fastestTime&&(e.fastestTime=t),t>e.slowestTime&&(e.slowestTime=t),e.totalTime+=t},t.prototype.time=function(t,e){e=e||this.defaultIterations,this._setup(t);for(var n=this._emptyTimeResult(),i=0;i<e;i++){var r=new Date;t.fn.apply(t.binding,t.fnArgs);var o=new Date;this._compareTimes(o-r,n)}return n.averageTime=n.totalTime/e,n},t.prototype.timeAsync=function(t,e){return new Promise(function(n,i){var r,o,s;e=e||this.defaultIterations,this._setup(t),r=this._emptyTimeResult();{var a,f=0;return(a=function(t){for(;t;){if(t.then)return void t.then(a,i);try{if(t.pop){if(t.length)return t.pop()?p.call(this):t;t=d}else t=t.call(this)}catch(t){return i(t)}}}.bind(this))(u);function u(){return f<e?(o=new Date,t.fn.apply(t.binding,t.fnArgs).then(function(t){try{return s=new Date,this._compareTimes(s-o,r),d}catch(t){return i(t)}}.bind(this),i)):[1]}function d(){return f++,u}}function p(){return r.averageTime=r.totalTime/e,n(r)}}.bind(this))},t.prototype._handleComparison=function(t,e,n,i){t.id=i,t.averageTime<e.fastestAverageTime&&(e.fastestIndex=n,e.fastestId=t.id,e.fastestAverageTime=t.averageTime),e.timeTaken[n]=t},t.prototype._emptyCompareResult=function(){return{fastestIndex:void 0,fastestId:void 0,fastestAverageTime:Infinity,timeTaken:[]}},t.prototype.compare=function(t,e){e=e||this.defaultIterations;for(var n=this._emptyCompareResult(),i=0;i<t.length;i++){var r=t[i],o=this.time(r,e);this._handleComparison(o,n,i,r.id)}return void 0===n.fastestId&&delete n.fastestId,n},t.prototype.compareAsync=function(t,e){return new Promise(function(n,i){var r,o;e=e||this.defaultIterations,r=this._emptyCompareResult();{var s,a=0;return(s=function(t){for(;t;){if(t.then)return void t.then(s,i);try{if(t.pop){if(t.length)return t.pop()?d.call(this):t;t=u}else t=t.call(this)}catch(t){return i(t)}}}.bind(this))(f);function f(){return a<t.length?this.timeAsync(o=t[a],e).then(function(t){try{return this._handleComparison(t,r,a,o.id),u}catch(t){return i(t)}}.bind(this),i):[1]}function u(){return a++,f}}function d(){return void 0===r.fastestId&&delete r.fastestId,n(r)}}.bind(this))},t});
//# sourceMappingURL=chronolite.umd.js.map
