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

app.get('/api/notes/:id', function (req, res) {
  const idNum = parseInt(req.params.id);
  if (isNaN(idNum) || idNum < 1) {
    return res.status(400).send({ error: 'id must be a positive integer' });
  }
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    if (obj.notes[idNum] === undefined) {
      return res.status(404).send({ error: `cannot find note with id ${idNum}` });
    }
    return res.status(200).send(obj.notes[idNum]);
  });
});

app.listen(3000, () => {

});
