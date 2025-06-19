const fs = require("fs");
const { result } = require("lodash");

//sync...
//fs.writeFileSync("./text.txt", "i am varun");

//Async..
fs.writeFile("./text.txt", "hello world", (err) => {});

fs.appendFile("./text.txt","\nThis is varun",(err)=>{});

// const result = fs.readFileSync("./text.txt", "utf-8");//RETURN DATA
// console.log(result);

fs.readFile("./text.txt", "utf-8", (err, result) => {//NOT RETURN 
    if(err){
        console.log("Found error ",err)
    }else{
        console.log(result);
    }
});


// to delete use unlink