const data = process.argv[2];
const fs = require('fs');
fs.writeFile('note.txt', data, 'utf8', err => {
  if (err) throw err;
});
