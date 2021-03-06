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
  const idNum = Number(req.params.id);
  if (isNaN(idNum) || idNum < 1 || !(Number.isInteger(idNum))) {
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

app.post('/api/notes', function (req, res) {
  const newText = req.body.content;
  if (newText === undefined || newText.length === 0) {
    return res.status(400).send({ error: 'content is a required field' });
  }
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    const { nextId: idNum } = obj;
    obj.notes[idNum] = { content: newText, id: idNum };
    obj.nextId++;
    fs.writeFile('data.json', JSON.stringify(obj, null, 2), err => {
      if (err) return res.status(500).send({ error: 'An unexpected error occurred.' });
      res.status(201).send(obj.notes[idNum]);
    });
  });
});

app.delete('/api/notes/:id', function (req, res) {
  const idNum = Number(req.params.id);
  if (isNaN(idNum) || idNum < 1 || !(Number.isInteger(idNum))) {
    return res.status(400).send({ error: 'id must be a positive integer' });
  }
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    if (obj.notes[idNum] === undefined) {
      return res.status(404).send({ error: `cannot find note with id ${idNum}` });
    }
    delete obj.notes[idNum];
    fs.writeFile('data.json', JSON.stringify(obj, null, 2), err => {
      if (err) return res.status(500).send({ error: 'An unexpected error occurred.' });
      res.sendStatus(204);
    });
  });
});

app.put('/api/notes/:id', function (req, res) {
  const idNum = Number(req.params.id);
  if (isNaN(idNum) || idNum < 1 || !(Number.isInteger(idNum))) {
    return res.status(400).send({ error: 'id must be a positive integer' });
  }
  const newText = req.body.content;
  if (newText === undefined || newText.length === 0) {
    return res.status(400).send({ error: 'content is a required field' });
  }
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const obj = JSON.parse(data);
    if (obj.notes[idNum] === undefined) {
      return res.status(404).send({ error: `cannot find note with id ${idNum}` });
    }
    obj.notes[idNum].content = newText;
    fs.writeFile('data.json', JSON.stringify(obj, null, 2), err => {
      if (err) return res.status(500).send({ error: 'An unexpected error occurred.' });
      res.status(200).send(obj.notes[idNum]);
    });
  });
});

app.listen(3000, () => {
});
