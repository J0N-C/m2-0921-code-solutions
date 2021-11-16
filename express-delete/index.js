const express = require('express');
const app = express();
const grades = {
  12: {
    id: 12,
    name: 'Tim Berners-Lee',
    course: 'HTML',
    score: 95
  },
  47: {
    id: 47,
    name: 'Brendan Eich',
    course: 'JavaScript',
    score: 100
  },
  273: {
    id: 273,
    name: 'Forbes Lindsay',
    course: 'JavaScript',
    score: 92
  }
};

let gradesArr = [];
for (const id in grades) {
  gradesArr.push(grades[id]);
}

app.get('/api/grades', function (req, res) {
  res.json(gradesArr);
});

app.delete('/api/grades/:id', function (req, res) {
  delete grades[req.params.id];
  gradesArr = [];
  for (const id in grades) {
    gradesArr.push(grades[id]);
  }
  res.sendStatus(204);
});

app.listen(3000, () => {
});
