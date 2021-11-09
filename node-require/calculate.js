const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');
const a = parseFloat(process.argv[2]);
const b = parseFloat(process.argv[4]);
if (process.argv[3] === 'plus') {
  console.log(`result: ${add(a, b)}`);
}
if (process.argv[3] === 'minus') {
  console.log(`result: ${subtract(a, b)}`);
}
if (process.argv[3] === 'times') {
  console.log(`result: ${multiply(a, b)}`);
}
if (process.argv[3] === 'over') {
  console.log(`result: ${divide(a, b)}`);
}
