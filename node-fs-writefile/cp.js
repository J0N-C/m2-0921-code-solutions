const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', (err, data) => {
  if (err) throw err;
  fs.writeFile(process.argv[3], data, 'utf8', err => {
    if (err) throw err;
  });
});
