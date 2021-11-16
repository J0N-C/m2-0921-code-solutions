const randInt = Math.floor(Math.random() * 101);
const data = randInt.toString();
const fs = require('fs');
fs.writeFile('random.txt', data, 'utf8', err => {
  if (err) throw err;
});
