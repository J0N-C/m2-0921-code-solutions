const fs = require('fs');
const methodName = process.argv[2];

if (methodName === 'read') {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data).notes;
    for (const [key, value] of Object.entries(notes)) {
      console.log(`${key}: ${value}`);
    }
  });
}
