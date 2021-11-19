const express = require('express');
const app = express();
var nextId = 1;
const grades = {};

function returnArr() {
  const gradesArr = [];
  for (const id in grades) {
    gradesArr.push(grades[id]);
  }
  return gradesArr;
}

app.get('/api/grades', function (req, res) {
  res.json(returnArr());
});

app.use(express.json());

app.post('/api/grades', function (req, res) {
  grades[nextId] = req.body;
  grades[nextId].id = nextId;
  res.status(201).send(grades[nextId]);
  nextId++;
});

app.listen(3000, () => {
});
