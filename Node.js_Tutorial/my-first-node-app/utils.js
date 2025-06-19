// Create a custom module
// utils.js
function greet(name) {
  return `Hello, ${name}!`; // template string/literals
}

function greet1(name) {
  return `Good Morning, ${name}!`; // template string/literals
}

module.exports = {
  greet,
  greet1,
};

// module.exports = {
//   greet,
//   greet1,
// };
