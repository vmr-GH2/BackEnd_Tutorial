//callback function
function greet(name){
    console.log(`Hello, ${name}!`);
}

function higherOrderFunction(callback){
    const name = "Varun";
    callback(name);
}

higherOrderFunction(greet);

//callback function : a function that is passed as argument in another function 
// is called as callback function 
//higher order function : a function that takes another
//  function as argument is called as higher order function

//types of callback 
//1. synchronous callback
//2. asynchronous callback

