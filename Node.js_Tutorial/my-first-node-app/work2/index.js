//module and import ,require,export
console.log("hello from index.js file");

// require("./add");
// require("./subtract");
// const result = require("./add1");//import the function definition 
// console.log("sum of two numbers : ", result(1,2));

const math = require("./multianddiv");

console.log("result of multiplication : ", math.obj1(5,6));
console.log("result of division : ", math.obj2(10,2));

const {obj1,obj2} = require("./multianddiv");

console.log("result of multiplication : ", obj1(5,6));
console.log("result of division : ", obj2(10,2));
