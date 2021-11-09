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

if (methodName === 'create') {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const dataObj = JSON.parse(data);
    dataObj.notes[dataObj.nextId] = process.argv[3];
    dataObj.nextId++;
    fs.writeFile('data.json', JSON.stringify(dataObj, null, 2), 'utf8', err => {
      if (err) throw err;
    });
  });
}
