const EventEmitter = require("node:events"); //import class of eventemitter

//create a new instance of EventEmitter
const emitter = new EventEmitter();

//listen for event and call the callback function
emitter.on("order-pizza", (size, topping) => {
  console.log(`Ordering a ${size} pizza with ${topping} topping`);
  //listen for event "order-pizza" and print argument
});

emitter.on("order-pizza", (size, topping) => {
    if(size === "large" && topping === "mashroom"){
        console.log("You have ordered a large pizza with mashroom topping");
    }
    //listen for event "order-pizza" and print argument
  });

//emit event that is order-pizza
//emit event with argument "large", "mashroom"
emitter.emit("order-pizza", "large", "mashroom");
