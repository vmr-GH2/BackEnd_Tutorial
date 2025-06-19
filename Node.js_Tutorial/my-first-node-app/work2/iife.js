(function(message) {
    var localVar = 'This is a local variable';
    console.log(message,localVar); // Output: This is a local variable
})("Hello,");

//IIFEs(immediately invoked function executions) are a powerful tool in JavaScript for creating local scopes, 
// avoiding global namespace pollution, and managing private variables. 
// They are also useful for executing async functions and 
// other initialization code that does not need to be reused
//iife is used for the module wrapper

