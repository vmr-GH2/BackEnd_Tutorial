const fs = require("fs"); //append new user to file

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `${Date.now()} : ${req.ip} : ${req.method} : ${req.path}\n`,
      (err, data) => {
        if (err) console.log(err);
        next(); //next middleware function/next function
      }
    );
  };
}
//next means subsequent middleware
module.exports = {
  logReqRes,
};
