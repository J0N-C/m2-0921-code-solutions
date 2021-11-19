const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

function ObjtoArr(obj) {
  const arr = [];
  for (const id in obj) {
    arr.push(obj[id]);
  }
  return arr;
}

app.get('/api/notes', function (req, res) {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    const notesArr = ObjtoArr(obj.notes);
    res.status(200).send(notesArr);
  });
});

app.listen(3000, () => {
});
