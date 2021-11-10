const fs = require('fs');
const methodName = process.argv[2];
const textString = process.argv[3];
const idNum = parseInt(textString);
const updatedNote = process.argv[4];

const read = () => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data).notes;
    for (const [key, value] of Object.entries(notes)) {
      console.log(`${key}: ${value}`);
    }
  });
};

if (methodName === 'read') {
  read();
}

const create = textString => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const dataObj = JSON.parse(data);
    dataObj.notes[dataObj.nextId] = textString;
    dataObj.nextId++;
    updateEntries(dataObj);
  });
};

if (methodName === 'create' && typeof textString === 'string') {
  create(textString);
}

const deleteNote = indexNum => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const dataObj = JSON.parse(data);
    delete dataObj.notes[indexNum];
    updateEntries(dataObj);
  });
};

if (methodName === 'delete' && idNum !== 'NaN') {
  deleteNote(idNum);
}

const updateNote = (indexNum, newNote) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const dataObj = JSON.parse(data);
    dataObj.notes[indexNum] = newNote;
    updateEntries(dataObj);
  });
};

if (methodName === 'update' && idNum !== 'NaN' && typeof process.argv[4] === 'string') {
  updateNote(idNum, updatedNote);
}

const updateEntries = data => {
  fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf8', err => {
    if (err) throw err;
  });
};
